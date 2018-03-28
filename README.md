# virtual-ptu.com
 > Virtual PTU's infosite

[![Build Status](https://travis-ci.org/Virtual-PTU/Website.svg?branch=master)](https://travis-ci.org/Virtual-PTU/Website)

This website has information about VPTU, and documents and credits sourced from information in the repository.
The public content of the website is located in the `beta` folder, this will be moved to `public` once the beta
releases.

## Usage
It's a website. You got here, you can get there! [https://www.virtual-ptu.com/](https://www.virtual-ptu.com/)

## Contributing
1. Fork it
2. Create a branch for the feature (start it with `feature/`)
3. Commit the changes
4. Push the branch
5. Submit a pull request! We'll get back to you ASAP

## Testing
Testing for this site requires Firefox and Chrome to be installed. Note, you should probably not be running them at the
same time as testing.
1. Clone the repository
2. `$ npm install`
3. `$ npm run test`
This'll start up Firefox and Chrome in `-headless` mode, and run some tests on the GUI.

If you want to manually test it, run `npm run server` and go to `http://localhost:8080`

## License
The MIT License (MIT)

```markdown
Copyright © 2018 Virtual PTU

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```