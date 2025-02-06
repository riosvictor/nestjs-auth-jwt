export class DomainEvent {
  constructor(public occurred: Date) {}
  process(): void {}
}