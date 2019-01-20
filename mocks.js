const mock_data = {
    "items": [
      {
        "owner": {
          "reputation": 294514,
          "user_id": 70393,
          "user_type": "registered",
          "accept_rate": 86,
          "profile_image": "https://i.stack.imgur.com/tTRDl.jpg?s=128&g=1",
          "display_name": "karim79",
          "link": "https://stackoverflow.com/users/70393/karim79"
        },
        "is_accepted": true,
        "score": 1007,
        "last_activity_date": 1405771704,
        "last_edit_date": 1405771704,
        "creation_date": 1295959352,
        "answer_id": 4793630,
        "question_id": 4793604,
        "link": "https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib/4793630#4793630",
        "body": "<pre><code>referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);\n</code></pre>\n\n<p>Where <code>referenceNode</code> is the node you want to put <code>newNode</code> after. If <code>referenceNode</code> is the last child within its parent element, that's fine, because <code>referenceNode.nextSibling</code> will be <code>null</code> and <a href=\"http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-952280727\" rel=\"noreferrer\"><code>insertBefore</code></a> handles that case by adding to the end of the list.</p>\n\n<p>So:</p>\n\n<pre><code>function insertAfter(newNode, referenceNode) {\n    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);\n}\n</code></pre>\n\n<p><a href=\"http://jsfiddle.net/UqDJk/\" rel=\"noreferrer\"><strong>Try it here.</strong></a></p>\n"
      },
      {
        "owner": {
          "reputation": 641,
          "user_id": 5250490,
          "user_type": "registered",
          "profile_image": "https://lh6.googleusercontent.com/-IYThXWz0kjw/AAAAAAAAAAI/AAAAAAAAAB8/XPEiDpa1VlI/photo.jpg?sz=128",
          "display_name": "Armando",
          "link": "https://stackoverflow.com/users/5250490/armando"
        },
        "is_accepted": false,
        "score": 54,
        "last_activity_date": 1440146912,
        "last_edit_date": 1440146912,
        "creation_date": 1440144313,
        "answer_id": 32135318,
        "question_id": 4793604,
        "link": "https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib/32135318#32135318",
        "body": "<h2>Straightforward JavaScript Would Be the Following:</h2>\n\n<p><strong>Append Before:</strong></p>\n\n<pre><code>element.parentNode.insertBefore(newElement, element);\n</code></pre>\n\n<p><strong>Append After:</strong></p>\n\n<pre><code>element.parentNode.insertBefore(newElement, element.nextSibling);\n</code></pre>\n\n<hr>\n\n<h2>But, Toss Some Prototypes In There For Ease of Use</h2>\n\n<p>By building the following prototypes, you will be able to call these function directly from newly created elements. </p>\n\n<ul>\n<li><p><code>newElement.appendBefore(element);</code> </p></li>\n<li><p><code>newElement.appendAfter(element);</code></p></li>\n</ul>\n\n<p><strong>.appendBefore(element) Prototype</strong></p>\n\n<pre><code>Element.prototype.appendBefore = function (element) {\n  element.parentNode.insertBefore(this, element);\n},false;\n</code></pre>\n\n<p><strong>.appendAfter(element) Prototype</strong></p>\n\n<pre><code>Element.prototype.appendAfter = function (element) {\n  element.parentNode.insertBefore(this, element.nextSibling);\n},false;\n</code></pre>\n\n<hr>\n\n<h2>And, To See It All In Action, Run the Following Code Snippet</h2>\n\n<p><div class=\"snippet\" data-lang=\"js\" data-hide=\"true\">\r\n<div class=\"snippet-code snippet-currently-hidden\">\r\n<pre class=\"snippet-code-js lang-js prettyprint-override\"><code>/* Adds Element BEFORE NeighborElement */\r\nElement.prototype.appendBefore = function(element) {\r\n  element.parentNode.insertBefore(this, element);\r\n}, false;\r\n\r\n/* Adds Element AFTER NeighborElement */\r\nElement.prototype.appendAfter = function(element) {\r\n  element.parentNode.insertBefore(this, element.nextSibling);\r\n}, false;\r\n\r\n\r\n/* Typical Creation and Setup A New Orphaned Element Object */\r\nvar NewElement = document.createElement('div');\r\nNewElement.innerHTML = 'New Element';\r\nNewElement.id = 'NewElement';\r\n\r\n\r\n/* Add NewElement BEFORE -OR- AFTER Using the Aforementioned Prototypes */\r\nNewElement.appendAfter(document.getElementById('Neighbor2'));</code></pre>\r\n<pre class=\"snippet-code-css lang-css prettyprint-override\"><code>div {\r\n  text-align: center;\r\n}\r\n#Neighborhood {\r\n  color: brown;\r\n}\r\n#NewElement {\r\n  color: green;\r\n}</code></pre>\r\n<pre class=\"snippet-code-html lang-html prettyprint-override\"><code>&lt;div id=\"Neighborhood\"&gt;\r\n  &lt;div id=\"Neighbor1\"&gt;Neighbor 1&lt;/div&gt;\r\n  &lt;div id=\"Neighbor2\"&gt;Neighbor 2&lt;/div&gt;\r\n  &lt;div id=\"Neighbor3\"&gt;Neighbor 3&lt;/div&gt;\r\n&lt;/div&gt;</code></pre>\r\n</div>\r\n</div>\r\n</p>\n\n<p><a href=\"https://jsfiddle.net/FunctionF/zwm360z2/\"><strong>Run it on JSFiddle</strong></a></p>\n"
      },
      {
        "owner": {
          "reputation": 3348,
          "user_id": 557019,
          "user_type": "registered",
          "accept_rate": 75,
          "profile_image": "https://www.gravatar.com/avatar/5d9d27378b303b4d44fb47292e53bd55?s=128&d=identicon&r=PG",
          "display_name": "James Long",
          "link": "https://stackoverflow.com/users/557019/james-long"
        },
        "is_accepted": false,
        "score": 31,
        "last_activity_date": 1484239192,
        "last_edit_date": 1484239192,
        "creation_date": 1295959380,
        "answer_id": 4793635,
        "question_id": 4793604,
        "link": "https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib/4793635#4793635",
        "body": "<p>A quick Google search reveals <a href=\"http://snipplr.com/view/2107/insertafter-function-for-the-dom/\" rel=\"noreferrer\">this script</a></p>\n\n<pre><code>// create function, it expects 2 values.\nfunction insertAfter(newElement,targetElement) {\n    // target is what you want it to go after. Look for this elements parent.\n    var parent = targetElement.parentNode;\n\n    // if the parents lastchild is the targetElement...\n    if (parent.lastChild == targetElement) {\n        // add the newElement after the target element.\n        parent.appendChild(newElement);\n    } else {\n        // else the target has siblings, insert the new element between the target and it's next sibling.\n        parent.insertBefore(newElement, targetElement.nextSibling);\n    }\n}\n</code></pre>\n"
      }
    ],
    "has_more": true,
    "quota_max": 10000,
    "quota_remaining": 9871
};