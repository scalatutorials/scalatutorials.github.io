---
layout: page
title: A Tour of Scala
tagline: Interactive, bite-sized lessons that run in your browser
permalink: /tour/
---

Each lesson pairs a short explanation with a live code editor: read on one side,
run and tweak real Scala on the other. Nothing to install: the code runs on
[Scastie](https://scastie.scala-lang.org), the Scala Center's online playground.

Your progress is saved in your browser; pages you've visited get a checkmark.

<p><a class="not-prose inline-block rounded-md bg-orange-600 px-5 py-2 font-medium text-white no-underline hover:bg-orange-700" href="/tour/interactive_tour_of_scala_scalculator.html">Start the tour →</a> <span class="text-sm text-zinc-500 dark:text-zinc-400">(or begin with the <a href="/tour/interactive_tour_of_scala_overview.html">overview</a> for a whirlwind feature tour)</span></p>

{% include tour-toc.html %}

<script defer src="/assets/js/tour.js?v={{ site.time | date: '%s' }}"></script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": {{ page.title | jsonify }},
  "description": {{ page.tagline | jsonify }},
  "provider": {
    "@type": "Organization",
    "name": {{ site.title | jsonify }},
    "sameAs": "{{ site.production_url }}/"
  },
  "url": "{{ site.production_url }}{{ page.url }}",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online"
  },
  "hasPart": [
    {% for p in site.data.tour %}
    {
      "@type": "LearningResource",
      "position": {{ forloop.index }},
      "name": {{ p.title | jsonify }},
      "url": "{{ site.production_url }}/tour/{{ p.file }}.html"
    }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ]
}
</script>
