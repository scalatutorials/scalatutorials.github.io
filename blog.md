---
layout: page
title: Blog
permalink: /blog/
---

<ul class="not-prose list-none space-y-4 p-0">
  {% for post in site.posts %}
  <li>
    <a class="text-lg font-medium text-zinc-900 hover:text-red-700 hover:underline dark:text-zinc-100 dark:hover:text-red-400" href="{{ post.url }}">{{ post.title }}</a>
    <p class="text-sm text-zinc-500 dark:text-zinc-400"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time></p>
  </li>
  {% endfor %}
</ul>
