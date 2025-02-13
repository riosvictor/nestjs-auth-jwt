import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  private largeArray: string[] = [];

  @Get('memory-leak')
  simulateMemoryLeak() {
    /**
      // Criando um vazamento de memória (acumulando dados na heap sem limpar)
      for (let i = 0; i < 1e6; i++) {
        this.largeArray.push(`Item ${i}`);
      }
      return { message: 'Memory leak simulated!' };
    */
        
    for (let i = 0; i < 1e6; i++) {
      if (this.largeArray.length > 1e6) {
        this.largeArray.shift(); // Remove itens antigos para liberar memória
      }
      this.largeArray.push(`Item ${i}`);
    }
  }

  @Get('cpu-intensive')
  simulateCpuLoad() {
    /*
      // Criando um problema de CPU (loop infinito de Fibonacci)
      function fibonacci(n: number): number {
        return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      }
    */

    const memo = new Map<number, number>();
    function fibonacci(n: number): number {
      if (memo.has(n)) return memo.get(n)!;
      const result = n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      memo.set(n, result);
      return result;
    }

    const result = fibonacci(42);
    return { message: `Heavy computation done! Result: ${result}` };
  }
}
