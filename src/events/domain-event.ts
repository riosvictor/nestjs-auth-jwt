export abstract class DomainEvent {
  readonly recorded: Date;
  readonly occurred: Date;

  constructor(occurred: Date) {
    this.occurred = occurred;
    this.recorded = new Date();
  }

  abstract process(): void;
}
