---
title: "Higher-Order, Higher-Order React Components"
slug: higher-order-react-components
collection: posts
date: 2016-03-06
layout: post.html
excerpt: An experiment in composing React components
---
## A Quick Intro

If you’ve kept up at all with the ever-evolving React best-practices, you’ve probably come across the concept of [higher-order components](https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775).  But just to put it in my own words, here’s a quick recap:

```javascript
// enhancer.js

// Accepts a component and returns a new component that has 
// some additional properties attached
export default function enhance(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} text=‘Enhanced!’ />;
		}
	}
}


// component.js
import Enhance from ‘./enhancer’;

class MyComponent extends React.Component {  
	render() {
	
		// The `text` prop is available via the enhancer
		const { text } = this.props;
		
		// <div>Enhanced!</div>
		return <div>{text}</div>;
	}		
}

export default Enhance(MyComponent);
```

The general idea is that you have this function that accepts a component as an argument and returns a _new_ component with some additional `props` attached. Here’s a good reference:  https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.q5if6eyah.

Why would you want to use this pattern?  In short, it’s just a more functional way of extending a component with new functionality or data.  You could achieve something similar in a more object-oriented way with inheritance and prototypes.  I won’t go into functional versus object-oriented programming, but suffice it to say that I prefer the functional approach so that’s what I choose to use in most situations.  

In this article I’m going to go into are some trials and tribulations that I’ve had using this pattern on a large React app.

## Level One: Basic Enhancement

A simple higher-order component looks like the sample code above.  Here’s a pen:

<p data-height="268" data-theme-id="0" data-slug-hash="dMGPZL" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/dMGPZL/">Level One</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

Once you get used the pattern, this example is pretty straightforward.  Now let’s step it up a level by doing some composition.

## Level Two: Higher-Order Composition

As my app grew, I began to need the functionality from multiple higher-order components.  I like to keep my higher-order components quite focused to a specific domain or task, so the logical step was to _compose_ multiple higher-order components together like so:


```javascript
// textEnhancer.js
export default function textEnhancer(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} text=‘Enhanced!’ />;
		}
	}
}

// numberEnhancer.js
export default function numberEnhancer(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} number={100} />;
		}
	}
}

// component.js
import textEnhancer from ‘./textEnhancer’;
import numberEnhancer from ‘./numberEnhancer’;

// I’m a nerd and I like to refer to lodash’s “flowRight” as “compose”
import compose from ‘lodash/flowRight’;

class MyComponent extends React.Component {  
	render() {
	
		// Both the `text` and `number` props are available via the enhancers
		const { text, number } = this.props;
		
		// <div>Enhanced!100</div>
		return <div>{text}{number}</div>;
	}		
}

export default compose(
	textEnhancer, 
	numberEnhancer
)(MyComponent);
```

This pattern allows for multiple higher-order components to be composed together to provide new functionality to a single component.  I like it because it allows the higher-order components to stay focused and small and also allows for the final child component to stay presentational (just renders data).

Here’s a more practical pen example:

<p data-height="268" data-theme-id="0" data-slug-hash="dMGPZL" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/dMGPZL/">Level One</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Complication #1: Order Matters

One thing that wasn’t entirely obvious to me using this pattern is that _order matters_.  Meaning, the order that you define your composition chain in makes a difference in what props are available at what time.  

Here’s an example of something that _would not_ work:

```javascript
// textEnhancer.js
export default function textEnhancer(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
		
			// FAIL:  The number prop isn’t available here
			const { number } = this.props;
			const text = `Enhanced! ${number}`;
			
			return <ComposedComponent {…this.props} text={text} />;
		}
	}
}

// numberEnhancer.js
export default function numberEnhancer(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} number={100} />;
		}
	}
}

// component.js
import textEnhancer from ‘./textEnhancer’;
import numberEnhancer from ‘./numberEnhancer’;

// I’m a nerd and I like to refer to lodash’s “flowRight” as “compose”
import compose from ‘lodash/flowRight’;

class MyComponent extends React.Component {  
	render() {
	
		// Both the `text` and `number` props are available via the enhancers
		const { text, number } = this.props;
		
		// <div>Enhanced!100</div>
		return <div>{text}{number}</div>;
	}		
}

export default compose(
	textEnhancer, 
	numberEnhancer
)(MyComponent);
```

Notice that in the `textEnhancer` component we’re trying to access `this.props.number` but that prop hasn’t been defined yet.  It’s easier to see here but harder to see when the components are more complex.

The thing to remember is that a React app is a _tree_ of components and data is passed down from parent to child.  The [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) are a great way to visualize this idea.  In the above example, the tree would look something like:

```javascript
<TextEnhancer />
	<NumberEnhancer />
		<MyComponent />
```

It’s easier to see here that the `TextEnhancer` component wouldn’t have access to anything provided by the `NumberEnhancer` because it’s the parent component.

It also might take a second glance to realize how the component tree is rendered based on how we defined our composition chain:

```javascript
export default compose(
	textEnhancer, 
	numberEnhancer
)(MyComponent);
```

A `compose` function runs from right-to-left so `numberEnhancer` is run first and `textEnhancer` second, but our composition tree ends up with `TextEnhancer` as the parent.  It’s easier to see by writing out all of the function compositions manually:

```javascript
export default textEnhancer(numberEnhancer(MyComponent))
```

Given that `textEnhancer` is the _last_ function to run, it will be the parent component.

This complication is something that needs to be kept in mind, but ultimately can't really be helped.  In fact, running into this problem generally means that you need to refactor your component tree a bit.  If two components depend on the same prop, then that prop should be abstracted into a common parent component.

## Complication #2: Prop Name Clashes

Another problem that I didn’t actually run into until quite some time had past was prop name clashes.  

Take this example:

```javascript
// textEnhancer.js
export default function textEnhancer(ComposedComponent) {
	return class EnhancedComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} text=‘Enhanced!’ />;
		}
	}
}

// wordEnhancer.js
export default function wordEnhancer(ComposedComponent) {
	return class EnhancedWordComponent extends React.Component {
		render() {
			return <ComposedComponent {…this.props} text=`Whoops.` />;
		}
	}
}

// component.js
import textEnhancer from ‘./textEnhancer’;
import wordEnhancer from ‘./wordEnhancer’;
import compose from ‘lodash/flowRight’;

class MyComponent extends React.Component {  
	render() {
		const { text } = this.props;
		
		// <div>Whoops.</div>
		return <div>{text}</div>;
	}		
}

export default compose(
	textEnhancer, 
	wordEnhancer
)(MyComponent);
```

Here you can see that both `textEnhancer` and `wordEnhancer` are using the same prop name of `text`.  Because `wordEnhancer` is the last in the composition chain, its `text` wins.  See this pen:

<p data-height="268" data-theme-id="0" data-slug-hash="LNGEww" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/LNGEww/">Prop Name Clash</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

To solve this problem, we can have our higher-order component first accept a function and return _another_ function that then accepts the component to wrap.  This is similar to how the [`connect`](https://github.com/reactjs/react-redux/blob/master/src/components/connect.js#L34) works in `react-redux`.

```javascript
// textEnhancer.js
export default (mergeProps = identity) => ComposedComponent => {
	return class EnhancedComponent extends React.Component {
		render() {
			const mergedProps = mergeProps({ text: ‘Enhanced!’ }, this.props);
			
			return <ComposedComponent {…mergedProps} />;
		}
	};
}

// wordEnhancer.js
// This accepts a `mergeProps` function that 
export default (mergeProps = identity) => ComposedComponent => {
	return class EnhancedWordComponent extends React.Component {
		render() {
			const mergedProps = mergeProps({ text: ‘Whoops’ }, this.props);
			
			return <ComposedComponent {…mergedProps} />;
		}
	};
}

// component.js
import textEnhancer from ‘./textEnhancer’;
import wordEnhancer from ‘./wordEnhancer’;
import compose from ‘lodash/flowRight’;

class MyComponent extends React.Component {  
	render() {
		const { text, word } = this.props;
		
		// <div>Enhanced! Whoops.</div>
		return <div>{text} {word}</div>;
	}		
}

export default compose(
	textEnhancer(),
	wordEnhancer((props, ownProps) => ({ …ownProps, word: props.text }))
)(MyComponent);
```

In the `wordEhancer` function, the final props we’re giving to the children are the result of running the `mergeProps` function with the enhanced props as well as the “own” props provided to the component by its parent.  This allows the consumer of the higher-order components to be in complete control of how its props are named.  It also frees us from having to worry about name-clashes through our app.  Here’s a pen:

<p data-height="268" data-theme-id="0" data-slug-hash="aNdOdr" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/aNdOdr/">Merge Props</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## Level 3: Higher-Order, Higher-Order Components

And now we venture yet one level deeper and experiment with higher-order….higher-order components.  You may noticed that there is some duplication in the above example.  If we were to continue in that fashion, every higher-order component we create would need to adhere to the same signature for accepting a `mergeProps` function, etc.  

With the introduction of [stateless function components](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions), a whole of world of functional composition has opened up.  We can attempt to reduce the above duplication by introducing a function which accepts a higher-order function and returns a _new_ higher-order function that enhances a component, all built with stateless components.    Example:

```javascript

// We define a default merger that just merges both the `props`
// and `ownProps` together
const defaultMerge = (props, ownProps) => ({ ...props, ...ownProps });

// This is a generic `mapper` helper.  It’s a curried function
// accepting the mapper function, the Component to render, and 
// finally returns a stateless function that just renders
// the previous component with the mapper function
const mapProps = mapper => Component => props => <Component {...mapper(props)} />;

// Our actual higher-order, higher-order function.
// Also curried, it takes the enhancer function, the merger
// function, and finally the Component to enhanced and 
// runs the component through a composition chain
const createHigherOrder = enhancer => (mergeProps = defaultMerge) => ComposedComponent => {
  let ownProps;
  
  return compose(
  
	  // This part is a little messy in that our `mapper` is
	  // really just a way to store the `ownProps` so 
	  // we have access to it later
    mapProps(props => (ownProps = props && ({ ...props }))),
    
    // The next child will be the result of the provided
    // enhancer function
    enhancer,
    
    // Finally, we do one more map.  This time by calling
    // the provided merger function with the props returned
    // from the enhancer function _and_ the `ownProps` we
    // stored earlier.  This will allows the consumer to have 
    // access to all of the props that would have been
    // passed down to it normally
    mapProps(props => mergeProps(props, ownProps))
  )(ComposedComponent);
  
};
  
// Notice that we don’t actually have to provide the parent 
// props via `{…this.props}`.
let enhance = ComposedComponent => {
  return class Enhanced extends React.Component {
    render() {
      return <ComposedComponent text='Text from first enhancer' />;
    }
  }
}
enhance = createHigherOrder(enhance);

let enhanceAgain = ComposedComponent => {
  return class EnhancedAgain extends React.Component {
    render() {
      return <ComposedComponent text='Text from second enhancer' />; 
    }
  }
}
enhanceAgain = createHigherOrder(enhanceAgain);

class MyComponent extends React.Component {
  render() {
    const { text, word, myOwnProp } = this.props;
    
    return <div>
      <p>I was provided the <code>text</code> prop of: <strong>{text}</strong></p>
      <p>I was provided the <code>word</code> prop of: <strong>{word}</strong></p>
      <p>I was provided the <code>myOwnProp</code> prop of: <strong>{myOwnProp}</strong></p>
    </div>;
  }
}

const Enhanced = compose(

	// Not passing any arguments here so we’ll just use the
	// default merging function
  enhance(),
  enhanceAgain((props, ownProps) => ({ ...ownProps, word: props.text }))
)(MyComponent);
```

Here’s a working pen:

<p data-height="268" data-theme-id="0" data-slug-hash="JXGdNj" data-default-tab="result" data-user="npbee" class="codepen">See the Pen <a href="http://codepen.io/npbee/pen/JXGdNj/">Higher-Order Higher-Order</a> by Nick Ball (<a href="http://codepen.io/npbee">@npbee</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

**Note**: The `mapProps` function is part of the excellent [Recompose](https://github.com/acdlite/recompose) library that has all sorts of little helper functions for doing stateless component composition.  

## Considerations

**Total Control**

If you noticed above in the last example, the enhancers don’t actually have to pass down their parent props via `{…this.props}`, they’re simply passing down the props they want their children to have:

```javascript
class EnhancedAgain extends React.Component {
	render() {
	  return <ComposedComponent text='Text from second enhancer' />; 
	}
}
```

We store the props _before_ running through the enhancer so we can provide those to the enhancer’s children with the given `mergeProps` function.  This could be seen as a good thing or a bad thing.  On one hand, I’ve never liked passing props via `{…this.props}`.  When you have long composition chains where all components are passing down every prop, it becomes harder to chase down where a prop originates from.  On the other hand, you can run into the same problem with `mergeProps` function and there’s also just a bit more “magic” involved.  
  
Another thing is that you could very easily cut off a supply of props to a component by not including the `ownProps`:

```javascript
// The consumer of the enhancer won’t get any of their `ownProps`!
const mergeProps = (props, ownProps) => props;

// first.js
const First = props => <div>{props.text} / {props.myOwnProp}</div>;
export default enhance(mergeProps)(First);

// second.js
import First from ‘./first’;

const Second = props => <First myOwnProp=‘Hello?’ />;
```

**Bloated Component Tree**

We’re introducing quite a few intermediate components and functions to be able to coordinate the props like this and that’s not totally free.  That said, I haven’t noticed any extreme performance problem using this pattern.  

**Mental Overhead**

Composing React components like this is not exactly easy to understand at first glance.  Functional programming in general can sometimes be a matter of taste so it bring some overhead that everyone on the team is not necessarily ready to take on.  Personally I think that once it “clicks” then it actually makes everything a lot easier to grok.  It allows me to stop trying to hold everything in my head at once and focus on the function at hand.

## Conclusion

Everything said, I’ve been enjoying this pattern at work.  I’ve even gone a bit farther with it and made the `createHigherOrder` function accept an object that has other options for configuration.  And at the end of the day, testing is the big winner for me with this pattern.  Most parts are just components returning props or functions being called, so it’s quite easy to break each part down into a function that can be tested on its own.
