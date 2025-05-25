import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  // @ts-ignore
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
