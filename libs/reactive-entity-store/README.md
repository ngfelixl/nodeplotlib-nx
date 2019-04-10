# ReactiveEntityStore

Currently I am part of [nodeplotlib](https://github.com/ngfelixl/ndoeplotlib-nx) but I am
completely independent. You can use me as a very simple to share-around and
easy to use entity store. I am providing utilities for all common crud operations and
I am completely reactive.

## Installation

```shell
npm install reactive-entity-store
```

## Usage

At first you have to create an empty entity store. Let's use the name *books*
in this demonstration. At first we create a file called **books-store.ts**
which will contain the following

```ts
import { Store } from 'reactive-entity-store';

export interface Book {
  id?: string;
  title: string;
  author: string;
}

export const books = new Store<Book>();
```

It does not matter how you name your files at all, this is just for demonstration
purposes. Lets create a reader of the store, lets name it **service.ts**.

```ts
import { books } from './pathto/books-store';

books.getAll().subscribe(books => console.log(books));
```

In another file called **controller.ts** we are going to play
around with some of the add and remove logic. The comments are
printed due to the `console.log` in the previous file.

```ts
import { books } from './pathto/books-store';

books.add$.next({ id: 'tcc', title: 'Clean Coder', author: 'Bob' });
// [{id: 'tcc', title: 'Clean Coder', author: 'Bob'}]
books.add$.next({ id: 'ng', title: 'Angular', author: 'Rob' });
// [{id: 'ng', title: 'Angular', author: 'Rob'}, {id: 'tcc', title: 'Clean Coder', author: 'Bob'}]
books.remove$.next('tcc');
// [{id: 'ng', title: 'Angular', author: 'Rob'}]
books.update$.next({id: 'ng', title: 'React'});
// [{id: 'ng', title: 'React', author: 'Rob'}]
books.add$.next({title: 'Vue', author: 'Evan'});
// [{id: 'someUniqueRandomString', title: 'Vue', author: 'Evan'}, {id: 'ng', title: 'React', author: 'Rob}]
books.removeAll$.next();
// []
```

The `someUniqueRandomString` will be a string of 20 characters [0-9a-zA-Z].