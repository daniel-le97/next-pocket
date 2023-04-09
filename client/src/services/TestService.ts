import { pb } from "utils/pocketBase";

class helloS {
  gettingDogs() {
    console.log("dogs");
  }
  sayHello(name: string) {
    console.log(`Hello ${name}`);
  }
}

type MyClassInstance = InstanceType<typeof helloS>;

function createProxy(target: MyClassInstance): MyClassInstance {
  const handler = {
    get(target: MyClassInstance, prop: keyof MyClassInstance) {
      console.log(`Getting property ${prop.toString()}`);
      return Reflect.get(target, prop);
    },
    set(
      target: MyClassInstance,
      prop: keyof MyClassInstance,
      value: string | number | boolean
    ) {
      console.log(`Setting property ${prop.toString()} to ${value.toString()}`);
      return Reflect.set(target, prop, value);
    },
  };

  return new Proxy(target, handler);
}
