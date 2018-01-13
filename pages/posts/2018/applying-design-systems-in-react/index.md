# Applying Design Systems In React

When building complex user interfaces, it can be challenging to maintain visual consistency across the entire app.  A component-based architecture can help, but without established patterns and practices it's still easy to write one-off styles that, over time, contribute to visual inconsistencies and lead to CSS bloat that can be hard to recover from.

A design system can help bring a defined set of rules for how to style your React components, but it can still be difficult to know how best to apply the design system to the components.  I'd like to discuss a few different patterns that I've experimented with for applying design systems to React components.

## The Problem

To frame the problem, let's say that you have a component to build that's a combination of a label and multiple inputs that should look a little like this:

<div class="example">
    <div class="input-component">
        <label>A Label</label>
        <input placeholder='First Name' />
        <input placeholder='Last Name' />
    </div>
</div>

Your design system in part looks a little like this:

```yaml
spacing:
  - 0rem
  - .25rem
  - .5rem
  - 1rem
  - 2rem
  - 4rem
  - 8rem
  - 16rem
  
type:
    - .75rem
    - .875rem
    - 1rem
    - 1.25rem
    - 1.5rem
    - 2.25rem
    - 3rem
    
colors:
    gray: #777777
    lightGray: #eeeeee
    nearBlack: #111111
```

The design system defines scales for both type and spacing as well as a few color variables.  I've listed it in yaml format here to emphasize that the system can be defined independently of your implementation language.  The values can always be converted to your language of choice.
 
## Start With SASS

A likely and completely reasonable choice for building this component in a consistent manner would be to use a CSS preprocessor, like SASS, and have the design system values listed as variables, e.g.

```scss
$spacing: 0rem, .25rem, .5rem, 1rem, 2rem, 4rem, 8rem, 16rem;
```

In this definition, you could grab the 3rd value on the spacing scale by doing:

```scss
.myStyle {
   padding: nth($spacing, 3);
}
```

An implementation of the style for our component might look like this:

```jsx
function InputList(props) {
    return (
        <div className="input-list">
            <label>My Label</label>
            <input placeholder="First Name" />
            <input placeholder="Last Name" />
        </div>
    );
}
```

```scss
@import "theme";

.input-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    > label {
        margin-bottom: nth($spacing, 3);
    }

    > input {
        border-radius: 3px;
        border: 1px solid $gray;
        color: $near-black;
        font-size: nth($type, 2); 
        margin-bottom: nth($spacing, 2);
        padding: nth($spacing, 3) nth($spacing, 3);
    }
}
```

**NOTE**: The component examples are meant to just discuss styling, so they are not meant to be fully functioning or 100% accessible.

In this version, we're pulling in the `theme` file that holds the SASS variables from our design system and applying those variables as needed to the style values.  This is a completely fine way to do things and usually a good place to start!  However, as the app and number of developers grow you may find that you're having a few issues with this strategy:

### Lots of Duplicated Styles

As you start writing other components, you might find that you're repeating the same SCSS rules all over the place.  You'll be writing `margin-bottom: nth($spacing, 3)` all over the place.  Besides being repetitive, this can lead to CSS bloat because the same style rule is being written multiple times to your CSS file.

### Requires Developer Diligence

Referencing the theme values in this way requires that developers actually remember and take the time to do it.  I've found that it can also be more tempting to dismiss the theme values "just this once" when you're writing out most of the style by hand.  Instead of doing `nth($spacing, 4)` in the component styles, someone might just hard-code a pixel value.  Hard-coded pixel values could be what the component calls for, but in my opinion, it's better to make those an exception to the rule. 

### Hard To Implement Contextual Style

By contextual style, I'm referring to the style that changes depending on where the component is being used.  An example of contextual styling would be _outer_ spacing, eg. the spacing values between components.  

For example, we might see that we can actually break our component down further to so that it's composed of a few other components: a `<Label />` and a `<Input />`:

```jsx
export function InputList(props) {
    return (
        <div className="input-list">
            <Label>My Label</Label>
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
        </div>
    );
}
```

This is good because now we could potentially use those components elsewhere in our app.  However, now some of the original styles from `InputList` don't quite make sense.

```scss
// ...
.input-list {
        // Some of the styles here should be true for all inputs, not just the inputs within the input list
    > input {
        border-radius: 3px;
        border: 1px solid $gray;
        color: $near-black;
        font-size: nth($type, 2); 
        margin-bottom: nth($spacing, 2);
        padding: nth($spacing, 3) nth($spacing, 3);
    }
}
```

It's reasonable to think that if we have a generic `Input` component, we want the padding to always be the same regardless of whether or not it's within an `InputList` or not.  We'd want to move those types of styles to the `Input` component itself:

```scss
// Input.scss
@import "theme";

input {
    border-radius: 3px;
    border: 1px solid $gray;
    color: $near-black;
    font-size: nth($type, 2);
    padding: nth($spacing, 3) nth($spacing, 3);
}
```

What about the `margin-bottom` value?  Does that still make sense?  I would say no.  We might want to place an `Input` component somewhere else on the page where a different `margin-bottom` value from the scale makes more sense.  

In that case, I think it makes sense to keep this rule with the `InputList` style.  We could do this:

```scss
// InputList.scss
@import "theme";

.input-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    > input {
        margin-bottom: nth($spacing, 2);
    }
}
```

But I'd argue that this is an anti-pattern because it creates an implicit dependency on a specific DOM structure.  The `InputList` knows that the `Input` component is just a single `input` so it can write a cascading rule to apply the correct styles.  This may work for _very_ diligent teams, but in my experience, it becomes difficult to maintain very quickly and can lead to the use of `!important` overrides.

## Using Wrapper Elements

Continuing from above, one workaround for contextual styling could be to pass custom `classNames` directly to each child component:

```jsx
function InputList(props) {
    return (
        <div className="input-list">
            <Label className="input-list__label">My Label</Label>
            <Input placeholder="First Name" className="input-list__input" />
            <Input placeholder="Last Name" className="input-list__input" />
        </div>
    );
}
```

In the child components, you'd need to make sure the class names get applied:

```jsx
export function Input({ className, ...rest }) {

        // Spreading the props 
    return <input className={className} {...rest} />;
}
```

I'm not a fan of this approach because I think it breaks some of the component encapsulation you get with a component-based architecture.  It also is another thing that requires developer diligence not to abuse.  Since you can pass in any class name that you want, you could pass in a class that completely alters the entire style of the component. 

```jsx
<Input className='bold-all-the-things' />
```

In my opinion, a better workaround would be to wrap components in a separate `div` which applies the contextual styling:

```jsx
export function InputList(props) {
    return (
        <div className="input-list">
            <div className="input-list__label">
                <Label>My Label</Label>
            </div>
            <div className="input-list__input">
                <Input placeholder="First Name" />
            </div>
            <div className="input-list__input">
                <Input placeholder="Last Name" />
            </div>
        </div>
    );
}
```

```scss
@import "theme";

.input-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    > .input-list__label {
        margin-bottom: nth($spacing, 3);
    }

    > .input-list__input {
        margin-bottom: nth($spacing, 2);
    }
}
```

This removes the coupling from the `InputList` and the `Input` component by wrapping the `Input` in a special class name and targeting that class with the styles.  Besides looking a little noisier, I think it's a good approach.  We'll explore some alternatives below.

For a good read on inner vs. outer spacing, see:  https://medium.com/fed-or-dead/handling-spacing-in-a-ui-component-library-70f3b22ec89

## Using Helper Classes

For the issue of duplicated styles, one solution might be to build a system of helper classes, specifically helper classes that are "atomic," meaning that only apply one style rule.  

With a SASS theme file that looks like this: 

```scss
$spacing: 0, 0.25rem, 0.5rem, 1rem, 2rem, 4rem, 8rem, 16rem;

$type: 0.75rem, 0.875rem, 1rem, 1.25rem, 1.5rem, 2.25rem, 3rem;

// Colors
$colors: (
    "gray": #eeeeee,
    "near-black": #444
);
```

You could use some SASS loops to create a helper file:

```scss
@import "theme";

// .margin-0 { margin: 0 }
// .margin-1 { margin: 0.25rem }
// .margin-2 { margin: 0.5rem }
// ...
@for $i from 2 through length($spacing) {
    .margin-#{$i - 1} {
        margin: nth($spacing, $i - 1);
    }
    .margin-bottom-#{$i - 1} {
        margin-bottom: nth($spacing, $i - 1);
    }
    .padding-#{$i - 1} {
        padding: nth($spacing, $i - 1);
    }
}

// .font-size-1 { font-size: 0.75rem }
// ...
@for $i from 1 through length($type) {
    .font-size-#{$i} {
        font-size: nth($type, $i);
    }
}

@each $color, $hex in $colors {
    .color-#{$color} {
        color: #{$hex};
    }
}
```

The `Input` component could now look more like this:

```jsx
export function Input(props) {
    return <input 
        {...props}
        className="padding-3 font-size-2 color-near-black" 
    />;
}
```

```scss
@import "theme";

input {
    border-radius: 3px;
    border: 1px solid map-get($colors, "gray");
}
```

We've applied helper classes to the element directly, which removes the need to redefine those same style rules everywhere.  Instead of having those same rules in the CSS file for every component, you just define them once and reference them where needed.  Because the classes are focused on a single rule, the chance of clashing between style rules is much smaller.  In fact, you could take things even further to define common `border-radius` and `border` helpers that use the theme values so that the `Input` component is composed entirely of helper classes!

I think this technique is a really good one for keeping the duplicated CSS down.  For a library that follows this sort of pattern, check out [Tachyons](http://tachyons.io/docs/).  I think it also helps to sway developers towards using defined classes instead of writing new CSS each time.  

While I like the helper class approach, I think it can be improved by utilizing React and the component architecture.  

Enter...

## The Box Component
The `Box` component is a component I first learned about from [jxnblk](http://jxnblk.com/) in posts like [this one](http://jxnblk.com/writing/posts/patterns-for-style-composition-in-react/) and libraries like [Styled System](https://github.com/jxnblk/styled-system).  The idea is that you have a very low-level React component that understands certain "style" `props` and translates those props to the corresponding CSS rules:

```jsx
import * as React from "react";
import kebabCase from 'lodash/kebabCase';

const styleProps = {
    marginBottom: true,
    padding: true,
    fontSize: true,
    color: true
};

function classNameFromProps(props) {
    return Object.keys(props).reduce(
        function([className, rest], propName) {
            const val = props[propName];

            if (styleProps[propName]) {
                className += `${kebabCase(propName)}-${val} `;
            } else {
                rest[propName] = val;
            }

            return [className, rest];
        },
        ["", {}]
    );
}

function Box(props) {
    const [className, rest] = classNameFromProps(props);

    return <div className={className} {...rest} />;
}
```

In this implementation, we're transforming the given `props` if we find a "style" prop that we understand and translate it to the correct class from our collection of CSS helpers.  You could use it like:

```jsx
export function InputList() {
    return (
        <div className="input-list">
            <Box marginBottom={3}>
                <Label>My Label</Label>
            </Box>
            <Box marginBottom={3}>
                <Input placeholder="First Name" />
            </Box>
            <Box marginBottom={3}>
                <Input placeholder="Last Name" />
            </Box>
        </div>
    );
}
```

Why is this better? Well, perhaps it's not, but here are a few reasons why I like it:

- It's a little more explicit.  Instead of passing strings around, you're providing explicit props.  With the right tooling, you can get things like autocomplete and static typing.
- It hides implementation details.  Instead of having to remember the exact class name to apply, you can create a convenient props API that can be implemented in different ways.  Another implementation approach to the one above would be to use some kind of CSS-in-JS approach as seen in the `styled-system` library docs.

### Extending the `Box` Component to Other Components

Currently, the `Box` is a glorified `div` with a few special abilities, so it doesn't help us much with other types of components.  One typical way to help with that is to allow for a special `tag` prop that specifies the element to use:

```jsx
export function Box(props: Props) {
    const { tag = "div", ...rest } = props;
    const [className, filteredProps] = classNameFromProps(rest);

    return React.createElement(tag, {
        className,
        ...filteredProps
    });
}
```

We could then define the `Input` like this:

```jsx
const Input = props => (
    <Box {...props} padding={3} fontSize={2} color="black" tag="input" />
);
```

In fact, if you're rendering `Box` components directly you could even get rid of the outer spacing wrapper components and just do this in `InputList`:

```jsx
export function InputList() {
    return (
        <div className="input-list">
            <Label marginBottom={3}>My Label</Label>
            <Input marginBottom={3} placeholder="First Name" />
            <Input marginBottom={3} placeholder="Last Name" />
        </div>
    );
}
```

This will pass on the `marginBottom` property to the underlying `Box` component and give the contextual styling we need without hard-coding within the component itself.  This, however, could be a double-edged sword.  The `InputList` component is assuming that `Input` is rendering a `Box` component and it's spreading all of the props that it receives.  I think this could be totally fine if it's a convention you want to establish with your team.  But, another option could be to use some of React's more advanced composition techniques.

### Higher Order `Box`

As an example, let's say we want to display _two_ of our `InputList` components on the page like this:

```jsx
<App>
    <InputList />
    <InputList />
</App>
``` 

We want the first `InputList` to have a `margin-bottom` value of "4" from the spacing scale.  How would we do that?  One way could be to have a higher-order React component that wraps up any component and provides it with the special style prop functionality:

```jsx
function asBox(Component) {
    function Box(props) {
        const [className, filteredProps] = classNameFromProps(props);

        return <Component boxClassName={className} {...filteredProps} />;
    }

    return Box;
}
```

This will wrap a given `Component` and return a new component that handles the prop -> style transformation and passes down a `boxClassName` prop with the resulting class name.  The component needs to apply the class to the top-level element.  I like to pass down a `boxClassName` rather than just `className` to be more explicit about the fact that the component is not accepting just any old class name, it's a class name specifically for the purpose of contextual styling.

In the `InputList` component, we export a wrapped version of the component:

```jsx
export function InputList({ boxClassName = "" }) {
    return (
        <div className={"input-list " + boxClassName}>
            <Label marginBottom={3}>My Label</Label>
            <Input marginBottom={3} placeholder="First Name" />
            <Input marginBottom={3} placeholder="Last Name" />
        </div>
    );
}

export default asBox(InputList);
```

Then we can apply like so:

```jsx
<App>
    <InputList marginBottom={4} />
    <InputList />
</App>
```

This is nice because allows the `InputList` to be open for styles, but only open for a very _controlled_ set of styles.  


## Downsides / Cost
We've come along way from plain SASS and that does come with a cost.  As with any abstraction, there's a trade-off.  In the case of the `Box` component, it can be tempting to add more and more props to the component API:

```jsx
<Box
  margin={3}
  borderColor='primary'
  lineHeight={2}
  textTransform='uppercase'
/>
```

While I don't necessarily think this is the worst, it can lead to situations where you can almost completely style something with just the `Box` but there's just one other rule that needs to be applied.  So you either add additional styles or just start adding more and more functionality to the `Box` component over time.  Something that I think may help is to split up functionality into different `Box`-like components.  Maybe you have a `Text` component that understands style props related to text and you keep `Box` just for spacing, e.g.:

```jsx
<Box margin={3}>
  <Text fontSize={3}>Some text</Text>
</Box>
```

You might also begin to add shorthand for these props like  `m` for `margin` or `pt` for `padding-top`.  This can be ok I think, but it can also become just one more thing to remember if you stray too far from the native style rule names.      

And finally, higher-order React components introduce more layers to the component tree so that can degrade performance in certain scenarios.  In practicality, I have not seen this become an issue, but it's important to measure and keep an eye on it.  

##  Wrap Up

I'm still learning about these techniques as I go, but I've  success with them so far.  In my opinion, each technique is a tool to be used depending on what the situation calls for.  The most important thing is to understand the potential pitfalls these techniques are trying to avoid how component styles relate to your overall design system.  With this knowledge, you can start to build stable, consistently styled components in a way that most makes sense for your team.  

## References
- https://medium.com/fed-or-dead/handling-spacing-in-a-ui-component-library-70f3b22ec89
- https://github.com/jxnblk/styled-system
- http://jxnblk.com/writing/posts/patterns-for-style-composition-in-react/
