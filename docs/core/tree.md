---
id: tree
title: Tree
sidebar_label: Tree
---

Holds methods to traverse app child modules.

## Usage
### getParent
#### `app.tree.getParent<T=IApp>():T`
get current parent app
```typescript
app.tree.getParent() // IApp
```
### parent
#### `app.tree.parent():IApp`
getter return current parent app
```typescript
app.tree.parent // IApp
```
### getRoot
#### `app.tree.getRoot<T=IApp>():T`
get current parent app
```typescript
app.tree.getRoot() // IApp
```
### parent
#### `app.tree.parent():IApp`
getter return current parent app
```typescript
app.tree.root // IApp
```
### children
#### `app.tree.children:IApp[]`
getter return current app children apps
```typescript
app.tree.children // IApp[]
```
### childAt
#### `app.tree.getChildAt(index: number): IApp`
 return app child at index
```typescript
app.tree.childAt(1) // IApp
```


