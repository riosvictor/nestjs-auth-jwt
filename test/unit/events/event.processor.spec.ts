import { Test, TestingModule } from '@nestjs/testing';
import { Country, Cargo, Port, Ship } from '../../../src/domain';
import {
  EventProcessor,
  ArrivalEvent,
  LoadEvent,
  DepartureEvent,
  UnloadEvent,
} from '../../../src/events';

describe('EventProcessor', () => {
  let eventProcessor: EventProcessor;
  let ship: Ship;
  let sanFranciscoPort: Port, vancouverPort: Port;
  let cargo: Cargo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventProcessor],
    }).compile();

    eventProcessor = module.get<EventProcessor>(EventProcessor);
    ship = new Ship('King Roy', Port.AT_SEA);
    sanFranciscoPort = new Port('San Francisco', Country.US);
    vancouverPort = new Port('Vancouver', Country.CANADA);
    cargo = new Cargo('Refactoring');
  });

  it('should set ship location on arrival', () => {
    eventProcessor.process(new ArrivalEvent(new Date('2005-11-01'), sanFranciscoPort, ship));
    expect(ship.port).toEqual(sanFranciscoPort);
  });

  it('should mark cargo if it arrives in Canada', () => {
    eventProcessor.process(new LoadEvent(new Date('2005-11-01'), cargo, ship));
    eventProcessor.process(new ArrivalEvent(new Date('2005-11-02'), vancouverPort, ship));
    eventProcessor.process(new DepartureEvent(new Date('2005-11-03'), ship));
    eventProcessor.process(new ArrivalEvent(new Date('2005-11-04'), sanFranciscoPort, ship));
    eventProcessor.process(
      new UnloadEvent(new Date('2005-11-05'), cargo, ship),
    );

    expect(cargo.hasBeenInCanada).toBeTruthy();
  });
});
