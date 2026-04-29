import { Component, signal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../post.model';
import posts from '../../data/posts.json';

type PTSpan = { _type: 'span'; text: string; marks: string[] };
type PTBlock = {
  _type: 'block';
  style: string;
  children: PTSpan[];
  markDefs: { _key: string; _type: string; href?: string }[];
};

function portableTextToHtml(blocks: unknown[]): string {
  return (blocks as PTBlock[]).map(block => {
    if (block._type !== 'block') return '';

    const inner = block.children.map(span => {
      let text = span.text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      for (const mark of span.marks) {
        if (mark === 'strong') { text = `<strong>${text}</strong>`; continue; }
        if (mark === 'em')     { text = `<em>${text}</em>`; continue; }
        if (mark === 'code')   { text = `<code>${text}</code>`; continue; }
        if (mark === 'underline') { text = `<u>${text}</u>`; continue; }
        const def = block.markDefs.find(d => d._key === mark);
        if (def?._type === 'link' && def.href) {
          text = `<a href="${def.href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
      }
      return text;
    }).join('');

    switch (block.style) {
      case 'h1': return `<h1>${inner}</h1>`;
      case 'h2': return `<h2>${inner}</h2>`;
      case 'h3': return `<h3>${inner}</h3>`;
      case 'h4': return `<h4>${inner}</h4>`;
      case 'blockquote': return `<blockquote>${inner}</blockquote>`;
      default: return inner ? `<p>${inner}</p>` : '';
    }
  }).join('\n');
}

@Component({
  selector: 'app-post-detail',
  imports: [DatePipe, RouterLink],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.scss',
})
export class PostDetail {
  post = signal<Post | null>(null);
  bodyHtml = signal<string>('');

  constructor() {
    const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug');
    const found = (posts as Post[]).find(p => p.slug.current === slug) ?? null;
    this.post.set(found);
    if (found?.body?.length) {
      this.bodyHtml.set(portableTextToHtml(found.body as unknown[]));
    }
  }
}
