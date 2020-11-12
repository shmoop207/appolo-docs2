---
id: graphql
title: GraphQL
sidebar_label: GraphQL
---
GraphQL module  built with [typegraphql](https://typegraphql.com/)

## Installation

```typescript
npm i @appolo/graphql
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `context` | request custom context object | `object` | null |
| `auth` | request auth custom object | `object` | null |
| `path` | ui path | `object` | `/graphql` |
| `middleware` |array of custom middlewares | `middleware` | `[]` |
| `serverRegistration` | options for custom server  | `object` | `{}` |
| `apolloServerConfig` | options for [apollo](https://www.apollographql.com/docs/apollo-server/api/apollo-server/)   | `object` | `{}` |
| `buildSchemaOptions` | options for [typegraphql](https://typegraphql.com/docs/bootstrap.html)  | `object` | `{}` |


in config/modules/all.ts

```typescript
import {GraphqlModule} from '@appolo/graphql';

export = async function (app: App) {
    app.module.use( GraphqlModule.for({
        middleware: [AuthMiddleware],
        auth: AuthChecker,
        buildSchemaOptions: {validate: true}
    }));
    
}
```

## Usage

### Resolver
```typescript
import {define, singleton} from '@appolo/inject'
import {Resolver, Query, FieldResolver, Arg, Root, Mutation, UseMiddleware, Ctx, Authorized,Register} from "@appolo/graphql";

@Resolver(of => Recipe)
@Register()
@singleton()
export class RecipeResolver {

    @inject() recipeService: RecipeService;

    @Query(returns => Recipe, {nullable: true})
    @UseMiddleware(LogAccess)
    async recipe(@Arg("recipeId") recipeId: string) {
        return this.recipeService.getOne(recipeId);
    }

    @Query(returns => Recipe, {nullable: true})
    @UseMiddleware(LogAccess)
    @Authorized("ADMIN", "MODERATOR")
    async recipeWithAuth(@Arg("recipeId") recipeId: string) {
        return this.recipeService.getOne(recipeId);
    }

    @Query(returns => [Recipe])
    async recipes(): Promise<Recipe[]> {
        return this.recipeService.getAll();
    }

    @Mutation(returns => Recipe)
    async addRecipe(@Arg("recipe") recipe: RecipeInput, @Ctx() context): Promise<Recipe> {
        return this.recipeService.add(recipe);
    }


    @FieldResolver()
    async numberInCollection(@Root() recipe: Recipe): Promise<number> {
        const index = await this.recipeService.findIndex(recipe);
        return index + 1;
    }

    @FieldResolver()
    contextParam(@Root() recipe: Recipe, @Ctx() context) {
        return context.test || ""
    }


}

````
### ObjectType
```typescript
import { Field, ID, ObjectType, Int } from "type-graphql";
@ObjectType()
export class Recipe {
    @Field(type => ID)
    id: string;

    @Field()

    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field(type => [String])
    ingredients: string[];

    @Field(type => Int)
    protected numberInCollection: number;


    @Field(type => String)
    protected contextParam: string;

    @Field(type => Int)
    protected get ingredientsLength(): number {
        return this.ingredients.length;
    }
}

```
### InputType


```typescript
import { InputType, Field } from "type-graphql";
import { string,array } from "@appolo/validator";
@InputType()
export class RecipeInput implements Partial<Recipe> {
    @Field({ nullable: true })
    @string().optional()
    description: string;

    @Field(type => [String])
    @array().items(string())
    ingredients: string[];

    @Field()
    @string().required()
    title: string;
}

```
### Auth
```typescript
import {Auth} from "@appolo/graphql";

@define()
export class AuthChecker extends Auth<any> {

    async check() {
        return this.resolverData.context.req.user.name === "test" && this.roles.includes("ADMIN");
    }
}

```

###  Middleware
```typescript
@define()
@singleton()
export class LogAccess implements MiddlewareInterface<any> {

    @inject() env: any
    @inject() logger: ILogger

    async use({context, info}: ResolverData<any>, next: NextFn) {
        context.test = "aaaa";
        return next();
    }
}


```

