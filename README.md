# Solution finder for [A-Puzzle-A-Day](https://a-puzzle-a-day.com/)

The solutions are saved as string with the pieces marked with letters.
Spaces mark the month/day.

Example for Feb 1: `U UVPPUUUVPP VVVZPYLNZZZYYLNZSSSYLNNSSSYLLN`

### How to generate the solutions:

Pre:

* node and npm installed

```shell
npm install
npm start
```

The solutions seperated per day will be written in the `solutions` folder.
File name will be `${month}-${day}.json`. Both 1-indexed.

File format is:

```json
{
  "month": "Jan",
  "day": 1,
  "count": 64,
  "solutions": ["... solutions"]
}
```