import { app } from 'hyperapp';
import html from 'hyperlit';

app({
  view: () => html`
    <main>
      <p class="test-message" data-cy="test-message">Hello World!</p>
    </main>
  `,
  node: document.getElementById('root')!,
});
