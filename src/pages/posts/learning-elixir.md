---
title: Learning Elixir
date: 2017-08-20
layout: ../../layouts/Post.astro
---

# Learning Elixir

> This is a post in a series of posts about learning back-end topics as a front-end developer.

Along with learning full-stack topics recently, I've also been learning [Elixir](https://elixir-lang.org/). I'll be honest, I'm not sure I would have been so interested in learning about back-end things if it weren't for the added bonus of getting to use Elixir to do so. I've always had an interest in functional programming and other functional languages. I typically write JavaScript in a functional fashion and I've toyed with other specifically functional languages like Elm, Clojure, and even Haskell. In the little time that I've spent venturing outside the comfortable world of JavaScript, I've found that learning other languages can unlock patterns and paradigms that I may not have otherwise grasped. Even though these patterns may not be directly usable in JavaScript, they can still give perspective and sometimes even make the patterns that _do_ exist more understandable. It feels a little like "leveling up."

## First Impressions

Overall: fantastic. A few specific things that I enjoyed immediately:

**Documentation**

Docs are a first-class concept in Elixir and it shows. Packages can easily build docs from code and they all follow a [similar](https://hexdocs.pm/elixir/Kernel.html) design layout. This makes browsing documentation familiar regardless of the package. And bonus, the documentation works in the REPL!

![iex docs](https://s3-us-west-2.amazonaws.com/npbee/2017/learning-elixir/iex-docs.png)

**Testing**

This is another first-class topic that has built-in support in Elixir. I've found testing to be simple and intuitive for most cases.

**Mix**

Mix is the build tool for Elixir that allows you to run tasks, compile, fetch dependencies, etc. As a front-end developer, it's similar to `npm` so it quickly made sense.

**Community**

I've found the community to be very friendly and inclusive. I even submitted a [pull request](https://github.com/elixir-lang/elixir/pull/6310) to the language!

**Functional Goodness**

And of course, I love that it's a functional language. Writing in a functional style is one thing, but writing functional code in a functional language is another. Being able to write lots of concise functions and combine them into a larger applications is my preferred way to write applications and Elixir seems to be designed just for that.

And [pattern matching](https://elixir-lang.org/getting-started/pattern-matching.html) is 😍.

## Second Impressions

Overall: still great. A few things that I started to struggle with:

**Composing Functions**

One thing that I love about writing functional code is composing functions together. By that I mean:

```javascript
// In pseudo-javascript
const add1 = (x) => x + 1;
const times2 = (x) => x * 2;
const math = compose(add1, times2);

math(2);
//=> 5
```

But surprisingly, this way of composing functions is not really used much that I've seen. The Elixir way of doing this might instead use the [pipe operator](https://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator).

```elixir
defmodule Math do
	def add1(x) do
	  x + 1
	end

	def times(x) do
	  x * 2
	end

	def math(x) do
	  x
	  |> times2
	  |> add1
	end
end

Math.math(2)
#=> 5
```

While everything you can do with compose can be accomplished by just defining functions, I do miss the `compose` function. The pipe operator is great, though!

**Pragmatism**

The pragmatic approach to the language is something that I've seen referred to a number of times. Pragmatism may have a different meaning to other people, but for me it mostly just means it can help you get things done. Elixir is a functional language, but it's not _pure_ functional language. That means you can do things like perform side effects in functions. While I generally try my darnedest to _not_ rely on side effects, I will say that it's nice to be use them on occasion. Writing completely side-effect free code takes diligence from an entire team and I can understand how that may be a hinderance to small teams trying to push out features. Overall I've found Elixir to have a nice balance of strictness and pragmatism that's resulted in some really maintainable code.

## Similarities / Differences

As I've gone through learning Elixir and implementing various features, I've started to notice how things _somewhat_ relate to familiar front-end concepts for me. Most of these comparisons are definitely not one-to-one, but I think they have helped me solidify a few things in my mind.

**Elixir Compiler ~ Babel**

Elixir is a compiled language, so that means before you can do anything with it, you have to transform it into something else. In the case of Elixir, your source code is compiled into Erlang. In the case of most modern JavaScript, your source code is compiled into...well, different JavaScript. Elixir is compiling into a completely different language whereas JavaScript is just compiling into a different version of itself. It might be an even closer comparison if you happen to be using experimental JavaScript syntax, like maybe the [pipe operator](https://github.com/tc39/proposal-pipeline-operator). In that case, you're using syntax that _must_ be transformed into code that the browser can understand, so you're essentially writing a different language.

**Pattern Matching ~ Destructuring**

This comparison is a bit of a stretch, but I can't help but note the syntactical similarities. In Elixir, you can use pattern matching to do something like:

```elixir
# pattern matching
%{a: a, b: b} = %{a: 1, b: 2}
#=> a == 1
#=> b == 2
```

In JavaScript, you could do:

```javascript
// Destructuring
const { a, b } = { a: 1, b: 2 };
//=> a === 1
//=> b === 2
```

These two things are definitely _not_ the same, but somehow I think learning about restructuring first gave me a head start on pattern matching. The downside is that it can be a little sad when you try to write an Elixir pattern match in JavaScript and realize you can't!

**OTP ~ Redux**

[OTP](https://elixirschool.com/en/lessons/advanced/otp-concurrency/) is one of the core principles of Elixir and Erlang. I can't say that I've mastered it yet, but I can almost see similarities with [Redux](http://redux.js.org/). When you use a [GenServer](https://elixir-lang.org/getting-started/mix-otp/genserver.html) in Elixir, there's this idea of functions that handle specific calls by receiving the state, doing something with it, and returning a new state:

```elixir
defmodule SimpleGenServer do
  use GenServer

  ### ...

  def handle_call({:add, value}, _from, state) do
    {:reply, value, state + 1}
  end

  ### ...
end
```

This could be seen as a type of reducer from Redux:

```js
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    default:
      return state;
  }
}
```

Of course, OTP is much more robust.

**Macros ~ Babel Transforms?**

[Macros](https://elixir-lang.org/getting-started/meta/macros.html) are the sort of thing that can really break your brain the first time you try to learn about them. Using macros, you can write code that _writes_ code. Because Elixir is compiled, it allows you to hook into that compilation step and use it to your advantage to write things like custom syntax or help with code reuse. In JavaScript land, Babel transforms could be potentially thought of as macros. For example, [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) turns this:

```javascript
<div>hello</div>
```

...into this when Babel compiles it:

```javascript
React.createElement("div", {}, "hello");
```

There's nothing stopping you from writing the compiled version, but using the Babel transform can make things clearer or faster to write (if you're into JSX).

## Conclusion

I've really enjoyed learning Elixir and I'm excited to keep going with it. Besides JavaScript, it's the only other language I've really taken a deep dive on and I think it's been a great second language to learn. Topics like macros and concurrency are challenging in any language, but I think learning them with Elixir has been very approachable.
