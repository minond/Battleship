Assigment 2.

I library I wrote called Polypus is used to render the board. The board template is bound to the <code>Boards</code> collection which contains the <code>myboard</code> model:

```html
&gt;script type="text/x-template" data-template_bind="Boards"&lt;
	<table class="board player">
	{list
		{rows* <tr>{columns* <td></td>}</tr>}
	}
	</table>
&gt;/script&lt;
```
