import type { ClientEvents } from 'discord.js';

/**
 * An event handler for the client.
 */
/**
 * Represents an event listener that can be used to listen for events and handle them with a callback function.
 * @template ClientEvent The type of event to listen for.
 */
export class Event<ClientEvent extends keyof ClientEvents> {
  /**
   * Creates a new Event instance.
   * @param event The event to listen for.
   * @param type The type of event listener ('on' or 'once').
   * @param handler The callback function to be called when the event is emitted.
   */
  constructor(
    public event: ClientEvent,
    public type: 'on' | 'once',
    public handler: (...args: ClientEvents[ClientEvent]) => void
  ) {}

  /**
   * Creates a new Event instance to listen for an event.
   * @param event The event to listen for.
   * @param handler The callback function to be called when the event is emitted.
   * @returns An Event object that can be used to be passed in a Plugin's options.
   */
  public static on<ClientEvent extends keyof ClientEvents>(
    event: ClientEvent,
    handler: (...args: ClientEvents[ClientEvent]) => void
  ) {
    return new Event(event, 'on', handler);
  }

  /**
   * Creates a new Event instance to listen for an event once.
   * @param event The event to listen for.
   * @param handler The callback function to be called when the event is emitted.
   * @returns An Event object that can be used to be passed in a Plugin's options.
   */
  public static once<ClientEvent extends keyof ClientEvents>(
    event: ClientEvent,
    handler: (...args: ClientEvents[ClientEvent]) => void
  ) {
    return new Event(event, 'once', handler);
  }
}
