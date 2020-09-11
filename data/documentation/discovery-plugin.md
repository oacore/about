---
title: CORE Discovery repository plugin documentation
---

To install the CORE Discovery plugin to your repository you first need to have 
an account with the [CORE Repository Dashboard](~services/repository-dashboard/). 
To register with the Dashboard [send us an email](~contact). 

When you get the plugin ID from the "Get Discovery" tab in the 
CORE Repository Dashboard you can move on with the instructions below.

<section class="section" id="eprints">
<h2>EPrints repositories</h2>

<p class="alert alert-info">
  CORE&nbsp;Discovery repository plugin is coming soon via the EPrints Bazaar.
</p>

<p class="alert alert-warning">
  The EPrints version of the&nbsp;plugin works only with the default
  HTML template but it should work fine with custom CSS.
  Although, if something goes wrong, please 
  <a class="alert-link" href="mailto:thet&#101;&#97;m&#64;c&#111;re&#46;&#97;c&#46;&#117;k">
    let us know</a>.
</p>

You can install the&nbsp;plugin by copying and pasting the following snippet.
Please note that due to the way that the EPrints template engine works,
the script URL contains escaped HTML entities.

```html
<script
  type="text/javascript"
  src="https://discovery.core.ac.uk/plugin.js?template=eprints&amp;id=XXXXX" 
  async="async"
></script>
```

Note to replace the ID-parameter `XXXXX` with your repository's plugin ID.

CORE&nbsp;Discovery repository plugin will automatically position itself after
the heading and author section in the metadata page. However,  if you experience
any issues with automatic snippet injection, copy the following code and paste
it wherever you wish the CORE&nbsp;Discovery to appear.

```html
<div id="core-discovery-root"></div>
```

You can take a glimpse of the&nbsp;plugin at  [Open Research
Online](http://oro.open.ac.uk/56725/), The Open University (or see an example
below). The&nbsp;plugin will look similar on your repository.

<div class="card card-body mb-3">
  <a href="http://oro.open.ac.uk/54889/" title="Open example in ORO">
    <img
      class="img-fluid"
      src="/images/discovery/oro-repository-plugin.png"
      alt="CORE Discovery repository plugin at Open Research Online"
      style="max-height: 74px"
    >
  </a>
</div>

To customise the&nbsp;plugin, go through the [custom styling section](#styling).
</section>


<section class="section" id="others">
<h2>Everyone else (non-Eprints)</h2>

Install the CORE&nbsp;Discovery repository plugin in any non-EPrints repository
or website. Add the following snippet on every web page on the site you wish
the&nbsp;plugin  to display on replacing `XXXXX` with your repository's plugin
ID.

```html
<script 
  src="https://discovery.core.ac.uk/plugin.js?id=XXXXX" 
  async
></script>
```

Also, add a `div` element with the following structure wherever you wish
the&nbsp;plugin to appear.

```html
<div id="core-discovery-root"></div>
```

After the installation, if the full text is not available from the repository
but  is discovered by CORE, the script will display a link to the full text as
shown in  the example below.

<div class="card card-body">
  <p>
    Full text is not available in the repository but discovered by 
    <a href="https://core.ac.uk" target="_blank">CORE</a>:
  </p>
  <a href="#">Get full text</a>
</div>
</section>

<section class="section" id="styling">
<h2>Custom styling</h2>

The&nbsp;plugin is influenced by the repository or website CSS. Feel free to 
customise the&nbsp;plugin right from there.

If you want to add something specific for the&nbsp;plugin only, encapsulate the
selector by prefixing it with `#core-discovery-root` like the example below.
Also, feel free to add any additional class names or attributes to the plugin
root element but note, if you use EPrints you need to add the element 
manually in order to be able to do that. 

```css
#core-discovery-root a {
  text-decoration: underline;
}
```

We recommend that you rely on element types (e.&nbsp;g.&nbsp;`table`, `a`, `p`) 
or any other generic selectors (i.&nbsp;e.&nbsp;attribute, pseudo-classes)  and
do not recommend to customise styles based on our class names like 
`core_label__1ORqN` because they are generated automatically  and may change
from build to build.
</section>

<section class="section" id="i18n">
<h2>Internationalization</h2>

The plugin supports internationalization via the `lang` HTML attribute. 
It tries to detect desired plugin language by checking the `lang` attribute
locally in the `<div id="core-discovery-root">` tag
and globally in the `<html>` tag.

We recommend to add a `lang` attribute into the `<html>` tag.
However, if you want to change the language of CORE&nbsp;Discovery locally,
add the attribute to `<div id="core-discovery-root">`, like in the example
below.

```html
<div id="core-discovery-root" lang="en"></div>
```

English is the default language of the plugin. If you add the `lang` attribute
but the plugin will be in English, please
[contact us](mailto:thet&#101;&#97;m&#64;c&#111;re&#46;&#97;c&#46;&#117;k)
and we will sort it out.

</section>

<section class="section" id="blacklisting">
<h2>How to blacklist a resource</h2>

In case you would like to block the&nbsp;plugin for a specific resource, [email
us](mailto:thet&#101;&#97;m&#64;c&#111;re&#46;&#97;c&#46;&#117;k) with the DOI
of the resource.
</section>

<section class="section" id="troubleshooting">
<h2>Troubleshooting</h2>

CORE&nbsp;Discovery repository plugin crawls the meta-tags of a metadata record
in the repository to check the availability of full text. If the tag
`citation_pdf_url`  does not exist the&nbsp;plugin is triggered, otherwise
nothing happens.

If you find that the CORE&nbsp;Discovery repository plugin does not work in your
repository or website please ensure that the `dc.*` or `citation_` meta-tags
have  been added.

If you are sure that the problem is on our side, do [contact 
us](mailto:thet&#101;&#97;m&#64;c&#111;re&#46;&#97;c&#46;&#117;k).
</section>
