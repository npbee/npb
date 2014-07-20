# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.delete_all
Post.delete_all
Tag.delete_all
TagRelationship.delete_all
Project.delete_all

user = User.create(
  name: "Nick",
  email: "nick@nick.com",
  password: "foobar85",
  password_confirmation: "foobar85",
  admin: true
)

guest = User.create(
  name: "Guest",
  email: "guest@guest.com",
  password: "guessing",
  password_confirmation: "guessing",
  admin: false
)

post = Post.create(
  title: "The Making Of",
  body: "Welcome to kinmill.com
===
As you can see, I'm new around here.  I've decided to mark my territory
on the web and create a space all my own.  As much as I hate to crowd this place (the internet)
with more 'self-taught developers,' I wanted a place to display the work I've done so far and
document my progress as a developer.  I think it's important to have a playground of sorts to
code and design out in the open.  I've learned everything I know from others on the internet
who do the same, so I thought I'd return the favor.  I thought I'd start with a rundown of how I
built this here site.  I absolutely love reading about how others build their sites, so here goes...

Bare Bones
---
In general the site is very basic, and I like it that way.  I set out to see how well I could fare with just
html, css, and vanilla javascript.  It was important to me to do things the hard way this time around,
especially when it came to the javascript.  Many of my projects used jQuery,
 but I wanted to really dig in and know what I was doing.  I now have a new-found appreciation for
 jQuery, but I also know when it's not needed.
  ",
  slug: "the-making-of",
  excerpt: "The making of kinmill.com",
  user_id: user.id,
  published: true
)

private_post = Post.create(
  title: "Private Post",
  body: "this is a private post, man.",
  slug: "private-post",
  excerpt: "My first private post",
  user_id: user.id,
  published: false
)


tag = Tag.create(
  name: "Ruby"
)

post_tag_relationship = TagRelationship.create(
  reference_id: post.id,
  tag_id: tag.id
)

project = Project.create(
  name: "S. Carey",
  role: "Design & Development",
  url: "http://scarey.org",
  date_completed: "2014-01-31",
  body: "Beginning to End
====
The S. Carey site was a project near and dear to my heart.  To give full disclosure, S. Carey is a band, and I play in this band.  What started originally as a thrown-together tumblr has grown to become a somewhat sophisticated, yet minimal and clean site.  It's been a project for over four years now (2014) and as it's grown as a site I've grown as a developer.  Here is the story...",
  logo: "/luray/logo.svg",
  thumbnail: "/scarey/thumb.svg",
  small_screen: "/scarey/iphone.jpg",
  medium_screen: "/scarey/ipad.jpg",
  large_screen: "/scarey/desktop.jpg",
  slug: "s-carey"
)

project_tag_relationship = TagRelationship.create(
  reference_id: project.id,
  tag_id: tag.id
)
