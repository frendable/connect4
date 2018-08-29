/**
 * I/O util for terminal
 */

import ansi from 'ansi';
import readline from 'readline';
const { stdout, stdin } = process;

let listeners = [];

const prefix = '\u001b';
const keys = {
  right: `${prefix}[C`,
  up: `${prefix}[A`,
  left: `${prefix}[D`,
  down: `${prefix}[B`,
  exit: '\u0003',
  space: ' '
}

export default class Interface {
  constructor(output = stdout, input = stdin) {
    this.output = output;
    this.input = input;

    this.input.setRawMode(true);
    this.input.setEncoding('utf8');

    this.cursor = ansi(this.output).hide();

    this.input.addListener('data', data => {
      let always = listeners.filter(listener => {
        return listener.key === '';
      });

      always.forEach(listener => listener.fn());

      let key = Object.keys(keys).find((value, i) => {
        return keys[value] === data;
      });

      if ( key === 'exit' ) {
				this.output.write('\u001b[2J\u001b[0;0H');
				process.exit();
			}

      let match = listeners.filter(listener => {
        return listener.key === key || listener.key === data;
      });

      match.forEach(listener => listener.fn());
    })
  }

  get columns() {
    return this.output.columns;
  }

  get rows() {
    return this.output.rows;
  }

  clear() {
    this.output.write('\u001b[2J\u001b[0;0H');
  }

  write(...args) {
    this.cursor.write(...args);
  }

  question(text, callback) {
    const rl = readline.createInterface({
      input: this.input,
      output: this.output
    });

    rl.question(text, (answer) => {
      rl.close();
      callback(answer);
    });
  }

  onKey(key, fn) {
    if (typeof key === 'function') {
      fn = key;
      key = '';
    }
    listeners.push({ key, fn });
  }

  clearListeners() {
    listeners = [];
  }

  get center() {
    return {
      x: this.output.columns / 2,
      y: this.output.rows / 2
    }
  }

  line(from, to) {
    let delta = {
      x: to.x - from.x,
      y: to.y - from.y
    }

    let error = 0;

    let deltaerr = Math.abs(delta.y / delta.x);

    let { y } = from;

    for (let x = from.x; x < to.x; x++) {
      this.cursor.goto(x, y);
      this.write('.');
      error += deltaerr;

      while (error >= 0.5) {
        this.cursor.goto(x, y);
        this.write('.');
        y += Math.sign(delta.y);

        error -= 1;
      }
    }
  }
}