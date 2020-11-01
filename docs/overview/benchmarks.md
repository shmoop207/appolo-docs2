---
id: benchmarks
title: Benchmarks
sidebar_label: Benchmarks
---

- Machine: 2.9 GHz Intel Core i9, 32GiB RAM
- Method: autocannon -c 100 -d 10 -p 10 localhost:3000
- Node v14.9.0


```typescript
node benchmarks/benchmarks
```

### Req/Sec

| Name    | Version  | Average | Min    | Max    | Latency |
|---------|----------|---------|--------|--------|---------|
| Appolo  | 8.0.0    | 72,100  | 49,436 | 76,039 |  1.33   |
| Fastify | 3.3.0    | 70,756  | 50,310 | 75,445 |  1.36   |
| Express | 4.17.1   | 18,382  | 13,679 | 19,608 |  5.34   |
| Nestjs  | 7.4.4    | 5873    | 4080   | 6450   |  16.69  |
