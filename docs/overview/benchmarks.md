---
id: benchmarks
title: Benchmarks
sidebar_label: Benchmarks
---

- Machine: 2.2 GHz Intel Core i7, 16GiB RAM
- Method: autocannon -c 100 -d 10 -p 10 localhost:3000
- Node v10.5.0


```typescript
node benchmarks/benchmarks
```

### Req/Sec

| Name    | Average  | Min    | Max    | Latency|
|---------|----------|--------|--------|--------|
| Appolo  | 42,010   | 23,840 | 43,985 |  2.31  |
| Fastify | 40,799   | 29,777 | 42,640 |  2.38  |
| Express | 30,408   | 19,271 | 32,802 |  3.21  |