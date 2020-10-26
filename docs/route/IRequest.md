---
id: IRequest
title: IRequest
sidebar_label: IRequest
---

the request object inherits from [http.ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest)
## Usage
### req.query
query params object

### req.body
body parser params object

### req.params
route params object

### req.hostname
host name of the request

### req.path
path name of the request

### req.secure
boolean true is the request is https

### req.protocol
protocol of the request http or https

### req.fullUrl
return full url with protocol hostname and path

### req.ip
return request ip

### req.model
if validation defined on the route will return the validation model

### req.app
instance of the appolo app

### req.get(name:string)
### req.header(name:string)
Returns the specified HTTP request header
```typescript
req.get('content-type'); // => "text/plain"
```
### req.is(type:string)
Returns the matching content type if the incoming request’s “Content-Type” HTTP header field matches the MIME type specified by the type parameter. If the request has no body, returns null. Returns false otherwise.
```typescript
req.is('html');       // => 'html'
req.is('text/html');  // => 'text/html'
```