# fizz-buzz REST server

A simple fizz-buzz REST server with statistics.

## Endpoints

### GET `/live` / GET `/ready`

Basic health check, always returns `200` if the server is running.

### GET `/api/v1/fizz-buzz`

This endpoint returns a JSON list of strings with numbers from 1 to `limit`, where:
all multiples of `int1` are replaced by `str1`, all multiples of `int2` are replaced
by `str2`, all multiples of `int1` and `int2` are replaced by `str1str2`.

It accepts the following query parameters:

* `int1` - required, non-zero positive integer
* `int2` - required, non-zero positive integer
* `limit` - required, non-zero positive integer
* `str1` - a string
* `str2` - a string

<details>
    <summary>Example (200 OK)</summary>

`/api/v1/fizz-buzz?int1=2&int2=3&limit=10&str1=foo&str2=bar`

```json
["1","foo","bar","foo","5","foobar","7","foo","bar","foo"]
```
</details>

<details>
    <summary>Example (400 Bad Request)</summary>

`/api/v1/fizz-buzz?int1=2&int2=0&limit=10&str1=foo&str2=bar`

```
Value 0 (int2) is not a positive integer
```
</details>

### GET `/api/v1/stats`

This endpoint returns a JSON object with the parameters of the most frequent request and
the number of occurrences of this request.

<details>
    <summary>Example (200 OK)</summary>

`/api/v1/stats`

```json
{"count":10,"int1":2,"int2":3,"limit":10,"str1":"foo","str2":"bar"}
```
</details>

📣 Current implementation of this endpoint relies on an in memory data source.
In other words, the statistics are not persisted between runs nor are they relevant
in a distributed environment.

However, one may provide its own data source implementation by implementing the
`stats.Statitistics` interface. Suitable data sources could be either No-SQL or SQL.
For the latter, the implementer will have to make sure the requests' parameters do not
lead to SQL injection (e.g., `str1` equals `DROP TABLE foo;`).
