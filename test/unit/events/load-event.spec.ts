import { Cargo, Country, Port, Ship } from '../../../src/domain';
import { LoadEvent } from '../../../src/events';

describe('LoadEvent', () => {
  let cargo: Cargo;
  let ship: Ship;
  let event: LoadEvent;

  beforeEach(() => {
    cargo = new Cargo('Computers');
    ship = new Ship('The Jolly Roger', Port.AT_SEA);
    event = new LoadEvent(new Date(), cargo, ship);
  });

  it('should be processed correctly the load event', () => {
    event.process();
    expect(ship['cargoList']).toContain(cargo);
  });

  it('should be reverted correctly the load event', () => {
    event.process();
    event.reverse();
    expect(ship['cargoList']).toHaveLength(0);
  });
});
