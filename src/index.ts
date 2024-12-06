import ansiEscapes from 'ansi-escapes';
import { EOL } from 'os';

const write = process.stdout.write.bind(process.stdout);
export class ProgressBar {
  total: number = 0;
  value: number = 0;
  constructor() { }
  start(total: number, initValue: number) {
    this.total = total;
    this.value = initValue;
    write(ansiEscapes.cursorHide)
    write(ansiEscapes.cursorSavePosition)
    this.render();
  }
  render() {
    let progress = this.value / this.total;
    if (progress < 0) {
      progress = 0
    } else if (progress > 1) {
      progress = 1
      this.value = this.total;
    }
    const barSize = 40;
    const completeSize = Math.floor(progress * barSize);
    const incompleteSize = barSize - completeSize;
    write(ansiEscapes.cursorRestorePosition);
    write('█'.repeat(completeSize)) // 已经完成的部分
    write('░'.repeat(incompleteSize)) // 未完成的部分
    write(`${this.value} / ${this.total}`)
  }
  update(value: number) {
    this.value = value;
    this.render()
  }
  getTotalSize() {
    return this.total;
  }
  stop() {
    write(ansiEscapes.cursorShow)
    write(EOL)
  }
}


