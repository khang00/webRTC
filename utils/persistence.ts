interface Nominal<Tag, Type> {
  tag: Tag;
  value: Type;
}

export class RealNumber implements Nominal<"real-number", number> {
  tag: "real-number" = "real-number";
  value: number;
}

const toRealNumber = (number: number): RealNumber => {
  return {
    tag: "real-number",
    value: number,
  };
};

const a: RealNumber = toRealNumber(10);
console.log(a);

type TagID = "ID";
const tagId: TagID = "ID";
type ID = Nominal<TagID, string>;
const toId = (textId: string): ID => [tagId, textId];

export interface Persistence<T extends { id: ID }> {
  save: (elem: T) => T;
  get: (elem: ID) => T;
}

interface Record {
  id: ID;
  value: String;
}

export class InfluxDB implements Persistence<Record> {
  get(elem: ID): Record {
    return {
      id: toId("id"),
      value: "value",
    };
  }

  save(elem: Record): Record {
    return {
      id: toId("id"),
      value: "value",
    };
  }
}
