import React from 'react';
import { Button, Icon, IconElement, List, ListItem, IconProps, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { TextProps } from '@ui-kitten/components';

interface IListItem {
  title: string;
  description: string;
}

interface ListAppelProps {
  data?: IListItem[];
}

export const ListAppel = ({ data }: ListAppelProps): React.ReactElement => {
  // Default data if none provided
  const listData = data || new Array(8).fill({
    title: 'Titre',
    description: 'Description',
  });

  const PhoneIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name='phone-outline'
    />
  );

  const renderItemAccessory = (): React.ReactElement => (
    <Button
      size='medium'
      style={styles.button}
      accessoryLeft={PhoneIcon}
      appearance='filled'
    >{(evaProps: TextProps) => <Text {...evaProps} style={styles.buttonText}>Appeler</Text>}
    </Button>
  );

  const renderItemIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name='person'
      style={[props.style, styles.icon]}
    />
  );

  const renderTitle = (title: string): React.ReactElement => (
    <Text style={styles.title}>{title}</Text>
  );

  const renderDescription = (description: string): React.ReactElement => (
    <Text style={styles.description}>{description}</Text>
  );

  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={() => renderTitle(item.title)}
      description={() => renderDescription(item.description)}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      style={styles.listItem}
      key={index}
    />
  );

  return (
    <List
      style={styles.container}
      data={listData}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  listItem: {
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 11,
    color: '#8F9BB3',
    lineHeight: 20,
  },
  button: {
    borderRadius: 30,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    marginLeft: -4, // Reduces the gap between icon and text
    fontWeight: 'bold',
    color: '#fff',
  },
});