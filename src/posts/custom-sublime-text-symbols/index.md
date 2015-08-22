---
title: Custom Sublime Text Symbols
collection: posts
date: 2015-04-04
layout: post.html
---

Recently I was exploring the possibility of defining custom symbols for a Sublime Text project.  A "symbol" is defined by the ST (Sublime Text) docs like so:

<blockquote>
Symbols usually are classes or functions, but can target any scope present in the syntax definition. See Symbols - Syntax Preferences (XXX to be added). If no symbols are defined, the search will simply fail.
</blockquote>

The end goal of this adventure was to be able to do something like this:

![ST Symbol Lookup](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols-symbol_lookup.gif)

I felt like I had to traverse the deep depths of Sublime Text to figure this out, so I thought I'd share.

<p class="footnote">This is just a rundown of my understanding of how things work.  It's likely that I'm mixing up some of the terminology so please take this with a grain of salt.</p>

Sublime Text Scopes
----
The first part of getting this done was understanding the concept of _scopes_ in ST.  A scope in ST is a named regular expression that's defined in a *.tmLanguage file.  Every syntax used in ST has a corresponding .tmLanguage file.  To find this file (in OSX), you can go to "Applications/Sublime Text 3" and click "Show Package Contents."  That will take you to the innards of ST.  From there, navigate to "Contents/MacOS/Packages" and you should see a bunch of ".sublime-package" files for different languages.  These files are really just zipped folders, so to see what's inside of one of them you can just copy it and rename the extension to be a .zip and then open it on up.  Inside, you'll find all the related files for that language, including the .tmLanguage file:

![sublime package directory](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols-sublime-package.png)

As an example, let's look at the JavaScript.tmLanguage file.
The first thing you'll notice is that the file is a "plist" file that's defined with XML syntax.  There are ways of avoiding the XML syntax, but for now know that this is the final format that a language file needs to be in for it to work in ST.  Here are a couple of interesting parts about this file:

```xml
<key>name</key>
<string>JavaScript</string>
```

This defines the name of the language as you see it the bottom right corner of ST when you're using that language syntax.
Following that there is an array of "patterns" that define the various scopes for the language.  Each item in the array will be a "dict" that has a couple of important key/value pairs.  Here's a simple-ish one:


```xml
<!-- line 594, JavaScript.tmLanguage -->
<dict>
	<key>match</key>
	<string>\\b(Anchor|Applet|Area|Array|Boolean|Button|Checkbox|Date|document|event|FileUpload|Form|Frame|Function|Hidden|History|Image|JavaArray|JavaClass|JavaObject|JavaPackage|java|Layer|Link|Location|Math|MimeType|Number|navigator|netscape|Object|Option|Packages|Password|Plugin|Radio|RegExp|Reset|Select|String|Style|Submit|screen|sun|Text|Textarea|window|XMLHttpRequest)\\b</string>
	<key>name</key>
	<string>support.class.js</string>
</dict>
```

Here there is a key called "match" and following that is the value, which is just a regular expression.  The regular expression in this case is just matching various Javascript classes.  After the regex there is another key/value pair that defines the name of this match.  This is the name of the _scope for this match.  To prove this point, there is a helpful ST package called "Scope Hunter" that will display the scope of anything under your cursor using the command Control+Shift+P.  Here's an example:

![scope hunter](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols-scope-hunter.png)

Displaying items in the symbol list
----

Now that we know how a scope is defined we can figure out how those are displayed in the symbol list when you use the go-to function.
Back in that sublime-package file, there will be another file called "Symbol List Function.tmPreferences."  This is another plist file and here is where we defined which scopes we want to show up in the symbol list.  Here's a snippet from that file:


```xml
<!-- line 4, Symbol List Function.tmPreferences -->
<dict>
	<key>name</key>
	<string>Symbol List Function</string>
	<key>scope</key>
	<string>source.js meta.function.js, source.js meta.function.json.js</string>
	<key>settings</key>
	<dict>
		<key>showInSymbolList</key>
		<string>1</string>
		<key>symbolTransformation</key>
		<string>s/^function\\s*\\(.*\\)//g</string>
	</dict>
	<key>uuid</key>
	<string>3CEA49B2-A5C5-405C-82E2-B8B668877C38</string>
</dict>
```

Walking through this file, you can see a few things:

```xml
<key>name</key>
<string>Symbol List Function</string>
```

Just giving the preference file a name here...

```xml
<key>scope</key>
<string>source.js meta.function.js, source.js meta.function.json.js</string>
```

Here is where we're defining the scope that we want this preference file to apply to.  These will be defined back in the .tmLanguage file with specific regular expressions.

```xml
<key>settings</key>
  <dict>
    <key>showInSymbolList</key>
      <string>1</string>
      ...
```

Here is where we're telling ST to show that scope that we named earlier in the file within the symbol list.

```xml
<key>symbolTransformation</key>
<string>s/^function\\s*\\(.*\\)//g</string>
```

This little bit is just a bit of sugar on top.  It takes the string that was matched by the scope's regular expression and formats it for display within the symbol list.

--

Defining your own scopes
----

We're finally ready to tell Sublime Text to show our custom matches within the symbol list!  Before going further, I highly recommend installing the [AAAPackageDev](https://github.com/SublimeText/AAAPackageDev) package.  This package will let you define these plist files in YAML or JSON and then convert them for you to the necessary XML.
We'll create our own demo syntax that adds on to the existing Javascript language.
First with the "JavaScript.tmLanguage" file open, copy the entire thing, rename it to "Demo.tmLanguage," and save it to your "User" packages directory which for me is here:

HardDrive ▸ Users ▸ _username_ ▸ Library ▸ Application Support ▸ Sublime Text 3 ▸ Packages

Anything that's placed in this directory ST will just pick up on its own.  Now, using the AAAPackageDev package, pull up the command palette (Shift+Control+P) and type "convert."  You should see an option to convert the file to YAML or JSON:

![package control convert](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols_convert.png)

Select "Convert to YAML (Block Style)" and it will convert the plist file to YAML for you and save it in the same directory.  Now open up that file.
Now with the YAML.tmLanguage file open, we'll first give our syntax a name.  Towards to the top, you should see a filed to give the language a name:

```yaml
comment: 'JavaScript Syntax: version 2.0'
fileTypes:
- js
- htc
- jsx
firstLineMatch: ^#!/usr/bin/env node
foldingStartMarker: ^.*\\bfunction\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$
foldingStopMarker: ^\\s*\\}
keyEquivalent: ^~J
name: *MyDemoLang*
```

Now, scroll down to the very bottom so we can add in another pattern to the array of patterns.  For the sake of the demo, let's say you have a function that you write a lot and the signature looks something like this:

```javascript
myFunc('some stuff', function() {
    var otherStuff;
});
```

At the bottom of the YAML, we'll add a very simple regular expression to define our scope:

```yaml
- match: \\[|\\]
  name: meta.brace.square.js
  - match: (myFunc).*
  name: custom.function.js
```

This will just match anything starting with the string "myFunc."  Notice that we have also given this match a name of "custom.function.js" so that will be our scope.  Now save the file and then use the "convert" command that we used to earlier, but this time convert back to a "Plist" or "Property List" file.
At this point you may need to restart ST, but you should be able to open up a demo.js file and choose your new language syntax!

![demo lang](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols_demo_lang.png)

You should also be able to use the scope hunter package to verify that our scope is being picked up:

![demo lang scope](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols_demo_lang_scope.png)

Ok almost there...
Before our new scope will show up as a symbol, we have to make a .tmPreferences file.  To make this file, it's easiest to do the same thing that we did earlier and copy one of the JavaScript .tmPreferences file and convert it to YAML.  It should look something like this:

```yaml
name: Symbol List Demo
scope: source.js custom.function.js
settings:
  showInSymbolList: '1'
  uuid: 0029a125-c35d-4c1a-868c-32f4c91adbee
```

So you'll see where defining what _scope_ this preferences file applies to and then telling ST to show it in the symbol list.  If you convert this back to a Plist format, you should now be able to see your scope showing up in the symbol list:

![custom symbol first](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols_custom_symbol_first.png)

--

The Extra Mile
----

Ok we have the custom symbols showing up now, but the symbol list is just showing the entire capture which is a little messy.  Going back to our .tmPreferences file we can tell ST how to display the symbol in the list:

```yaml
name: Symbol List Demo
scope: source.js custom.function.js
settings:
  showInSymbolList: '1'
  symbolTransformation: 's/\\(/:  /g; s/,.*//g;'
  uuid: 0029a125-c35d-4c1a-868c-32f4c91adbee
```

The 'symbolTransformation' does a search and replace based on the regex that's given.  In this case we're doing two search and replace operations:  one to remove the left paren and replace it with a ":" plus some white space, and another to search for a comma followed by any character and replace it with nothing.  If you convert this back to a plist, you should now be able to see the difference:

![custom symbol second](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols_custom_symbol_second.png)

And the last optional thing here might be to add some syntax highlighting for this custom scope.  I've found an easy way to do this is to just use one of the existing scopes that ST has already defined for JavaScript because that way it will just use existing syntax highlighting.  Back in your Demo.YAML-tmPreferences file:

```yaml
- match: (myFunc).*
  name: custom.function.js
  captures:
    "1":
      name: entity.name.function.js
```

Here we're using the same regular expression, but we're now defining exactly what each capture is.  We're telling ST that whatever is within the parentheses should be seen with the "entity.name.function.js" scope.

<p class="footnote"><span class="italic">Technically</span> if you do this, ST will automatically pick up this capture and display it in the symbol list.  This is because the built-in JavaScript sublime package has it set to show anything with this scope in the symbol list.  But it would only display it as "myFunc" and nothing else because that's the only thing that's captured.</p>

Now (you may need to restart ST again), you should be able to see some nice syntax highlighting in your demo file to complete the final step:

![ST symbol lookup](https://s3-us-west-2.amazonaws.com/npbee/2014/2014-11-23-custom-sublime-text-symbols-symbol_lookup.gif)

--

Well that was a lot.  Some may say this is more trouble than it's worth and I wouldn't necessarily disagree.  However, if you have a big project that's using a lot of the same function signatures it can really help to be able to hop around your files easily.  An alternative to making your own "language" is to just edit the built-in JavaScript sublime package, but that would come with its own issues.
