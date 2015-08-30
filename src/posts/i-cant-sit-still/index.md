---
title: I Can't Sit Still
slug: i-cant-sit-still
layout: post.html
date: 2015-08-30
collection: posts
excerpt: Or the four phases of this blog
image: negativespace.jpg
---

# Phase 1: Static Site Generator

When I was first entertaining the notion of having my very own site, I had
really only tackled basic HTML and CSS.  I wasn't familiar with Javascript or
back-end technologies of any kind, so a static site generator seemed like the
perfect fit.  I chose [ Jekyll ]( http://jekyllrb.com/ ) as my site generator
and for a while, it was good.

# Phase 2: Ruby on Rails

Suddenly, I learned more things.  I had graduated myself from a complete noob to
a somewhat promising apprentice and I had my sights set on becoming a
full-fledged web developer.  After a long internal struggle of which language to
learn, I settled on Ruby and decided that the smart move would be to build my
site in Ruby on Rails.  So, that's what I did.  My simple site was a full-on
Rails app with routes, a database, and a deployment system.  Things were ok for
a while.

# Phase 3:  All Javascript

After settling in the web development world for a while, I found myself really
focusing more and more on Javascript.  It became my first specialty and I
decided to dive in deep.  Having my site be a Rails now seemed silly.  I was a
_Javascript_ developer and my site was built with Ruby, even though building a
web app completely with Javascript was absolutely possible.  I rebuilt my site
for the third time as a Universal (_isomorphic_ to some) Javascript app.  Using
the latest and greatest:  React, Koa, Babel, Postgres, etc.  It was my most
complex app to date.  

The problem?  I came back a week later to write a blog
post and I completely forgot how everything worked.  

# Phase 4:  Static Site Generator (again)

So now I've come full circle back to a static site generator.  I decided on 
[Metalsmith](http://www.metalsmith.io/) this time because it's super extensible 
and it's written in Javascript.  Before rewriting the site for the fourth time I
decided to sit down and actually think about what problems I was trying to solve
for myself before going straight to coding.  You know, like a good developer
might do.  

Here are the problems I focused on solving:

## Writing

Creating and putting my thoughts down is the most important part of the site.
It is, after all, a _blog_.  Writing a new post is now as easy as opening up a
new markdown file in the "posts" folder.  

## Styling

Styling is the next task that I spend the most time on.  I enjoy going in a
tweaking the styling and trying out new things.  I use [SASS](http://sass-lang.com/)
 and [Autoprefixer](https://github.com/postcss/autoprefixer) so I needed a way
to easily use those tools.  I have a simple gulp task for watching my `.scss`
files and recompiling.

## Javascripting

This site does not _need_ any Javascript and that's something I'm trying to be 
more mindful of in general with anything I build.  That said, I am a Javascript
developer so I wanted a way to be able to try new things and share them here on
the site.  I also wanted these experiments to be able to stand on their own
without needing any dependencies from the rest of the site and also the other
way around, meaning I don't have to include React as a dependency on the site
when really I only need it in one experiment that I'm doing.  

So, my workflow in this scenario is the most complicated bit of the site.  I have 
a separate `labs` folder where I keep these experiments.  Anything in this
directory is treated as its own project.  Each project will have its own
`project.json` file and its own dependencies.  Really, they can just be their
own Git repositories so I can keep them completely separated.  People can clone
them and run them locally without any trouble.  

The difference in the context of the site is that, when deploying, I use 
Metalsmith to basically mash the project's `index.html` and `readme.md` together 
and then plop into a layout like any other page on the site.  So a project's
`index.html` would look like this:

```html
<html>
    <body>

    <!-- CUT -->
    <div id="root'></div>
    <script src="./bundle.js"></script>
    <!-- /CUT -->

    </body>
</html>
```

And my readme.md would look this:

```md
<!-- PASTE -->

# The Project
...
```

I cut everything between the `<!-- CUT -->` and the `<!-- /CUT -->` in the
`index.html` and paste where the `<!-- PASTE -->` comment is in the `readme.md`
file.  This allows me to present the project in the context of the site, but I
can still develop the project separately.

# Phase 5 ???

How long will this phase last?  I'm not sure.  Hopefully longer this time.  The
different iterations of this site have been huge learning experiences for me
regardless.  I'd like to think that I've gained a little wisdom and that I'm past the
point of trying to show off what I can do and now just trying to pick the best
tools for the job.  But I'm not holding my breath...

