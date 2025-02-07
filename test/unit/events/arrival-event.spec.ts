import { Country, Port, Ship } from "../../../src/domain";
import { ArrivalEvent } from "../../../src/events";

describe('ArrivalEvent', () => {
  let ship: Ship;
  let port: Port;
  let event: ArrivalEvent;

  beforeEach(() => {
    ship = new Ship('The Jolly Roger', Port.AT_SEA);
    port = new Port('San Francisco', Country.US);
    event = new ArrivalEvent(new Date(), port, ship);
  });

  it('should be processed correctly the arrival event', () => {
    event.process();
    expect(ship.port).toBe(port);
  });

  it('should be reverted correctly the arrival event', () => {
    event.process();
    event.reverse();
    expect(ship.port).toBe(Port.AT_SEA);
  });
});
