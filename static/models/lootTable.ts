export class LootTable {
  loot_id?: number;
  type?: string;
  picture?: string;
  fight_picture?: string;
  name?: string;
  description?: string;
  rarity?: string;
  damage_min?: number;
  damage_max?: number;
  armor_min?: number;
  armor_max?: number;
  strength_min?: number;
  strength_max?: number;
  intelligence_min?: number;
  intelligence_max?: number;
  speed_min?: number;
  speed_max?: number;
  charisma_min?: number;
  charisma_max?: number;
  health_min?: number;
  health_max?: number;
  luck_min?: number;
  luck_max?: number;
  charm?: boolean;
  charm_type?: string;
  charm_value?: number;
}
