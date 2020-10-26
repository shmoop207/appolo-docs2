---
id: IResponse
title: IResponse
sidebar_label: IResponse
---

the response object inherits from [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)

## Usage

### status
#### status(code: number): IResponse
set response status code
```typescript
res.status(200).json({name:"value"});
```
### contentType
#### contentType(type: string): IResponse
set response content type

### header
#### header(key: string, value: string): IResponse
#### set(key: string, value: string): IResponse
set response header

### cache
#### res.cache(seconds: number): IResponse
set Cache-Control header in seconds

### gzip
#### gzip(): IResponse
compress the response with gzip and set Content-Encoding header to gzip

### redirect
#### redirect(path: string): void
redirect the request to new path

### cookie
#### cookie(key: string, value: any, options?: cookie.CookieSerializeOptions): IResponse
sets cookie name to value. The value parameter may be a string or object converted to JSON.

```typescript
res.cookie('name', 'test', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('someName', '{someVal:1}', { expires: new Date(Date.now() + 900000), httpOnly: true });
```
### clearCookie
#### clearCookie(key: string, options?: cookie.CookieSerializeOptions): IResponse
clears the cookie specified by name.
```typescript
res.cookie('name', 'tobi', { path: '/admin' });
res.clearCookie('name', { path: '/admin' });
```
### cache
#### cache(seconds: number)
add Cache-Control header
```typescript
res.cache(1000);
```
### json
#### json(obj: object)

sends a JSON response.
```typescript
res.json({name:"value"});
```
### jsonp
#### jsonp(obj: object)
Sends a JSON response with JSONP support. This method is identical to res.json(), except that it opts-in to JSONP callback support
```typescript
res.jsonp({name:"value"});
```

### send
#### send(data?: string | Buffer| object)
send data response

```typescript
res.send(new Buffer('some buffer'));
res.send({ some: 'data' });
res.send('<p>some html</p>');
res.status(404).send('not found');
res.status(500).send({ error: 'some error' });
```
