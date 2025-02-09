1. Error with type any
TypeScript cannot check "blockchain" data types, so If you accidentally pass in a data type other than string, TypeScript does not report an error, but the program may crash.
Another problem with using any data type: as the code base grows and developers work together, any data types can be difficult for other developers to understand, and debugging when problems arise can be extremely difficult.
Solution: Can use string in this case (blockchain : any -> blockchain : string) or can declare enums to control "blockchain" values, and can be reused and easily edited between files when needed

```typescript
enum Blockchain {
  Osmosis = {label: "Osmosis", value: 100},
  Ethereum = {label: "Ethereum", value: 50},
  Arbitrum = {label: "Arbitrum", value: 30},
  Zilliqa = {label: "Zilliqa", value: 20},
  Neo = {label: "Neo", value: 20},
}
```

Use: 
```typescript
case 'Osmosis': return 100  --> case Blockchain.Osmosis.label: return Blockchain.Osmosis.value
```

2. "prices" variable in dependency of useMemos but not used in calculation
Solution: Remove "prices" from dependency to avoid unnecessary re-rendering

3. Logic in .sort
```typescript
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
```
So what wrong if leftPriority === rightPriority, it may cause unexpected errors.
Solution: Handle all possible scenarios

```typescript
if (leftPriority > rightPriority) {
  return -1;
} else if (leftPriority < rightPriority) {
  return 1;
} else {
  return 0;
}
```

4. There are two sortedBalances.map
It causes loss of performance, If possible, please incorporate (I don't have enough data to decide)

5. Don't Use "index" as key in React
May cause rendering errors if the list changes order
Solution: can use "balance.currency" as key

```tsx
<WalletRow 
    className={classes.row}
    key={balance.currency}
    amount={balance.amount}
    usdValue={usdValue}
    formattedAmount={balance.formatted}
/>
```

