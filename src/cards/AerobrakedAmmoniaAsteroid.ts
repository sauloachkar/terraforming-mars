import {ICard} from './ICard';
import {IProjectCard} from './IProjectCard';
import {Tags} from './Tags';
import {CardType} from './CardType';
import {Player} from '../Player';
import {SelectCard} from '../inputs/SelectCard';
import { Resources } from "../Resources";
import { ResourceType } from '../ResourceType';
import { CardName } from '../CardName';
import { Game } from '../Game';
import { LogMessageType } from '../LogMessageType';
import { LogMessageData } from '../LogMessageData';
import { LogMessageDataType } from '../LogMessageDataType';

export class AerobrakedAmmoniaAsteroid implements IProjectCard {
    public cost: number = 26;
    public tags: Array<Tags> = [Tags.SPACE];
    public name: CardName = CardName.AEROBRAKED_AMMONIA_ASTEROID;
    public cardType: CardType = CardType.EVENT;

    public play(player: Player, game: Game) {
      const cardsToPick = player.getResourceCards(ResourceType.MICROBE);
      player.setProduction(Resources.HEAT,3);
      player.setProduction(Resources.PLANTS);

      if (cardsToPick.length < 1) return undefined;

      if (cardsToPick.length === 1) {
        player.addResourceTo(cardsToPick[0], 2);
        this.logCardEffect(game, player, cardsToPick[0]);
        return undefined;
      }

      return new SelectCard(
          'Select card to add 2 microbes', cardsToPick,
          (foundCards: Array<ICard>) => {
            player.addResourceTo(foundCards[0], 2);
            this.logCardEffect(game, player, foundCards[0]);
            return undefined;
          }
      );
    }

    private logCardEffect(game: Game, player: Player, card: ICard) {
      game.log(
        LogMessageType.DEFAULT,
        "${0} added 2 microbes to ${1}",
        new LogMessageData(LogMessageDataType.PLAYER, player.id),
        new LogMessageData(LogMessageDataType.CARD, card.name)
      );
    }
}
