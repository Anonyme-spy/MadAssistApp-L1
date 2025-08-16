import React from 'react';
import { Button, Icon, IconElement, List, ListItem, IconProps, Text } from '@ui-kitten/components';
import { StyleSheet} from "react-native";
import { TextProps } from '@ui-kitten/components';
import handleEmergencyCall from "@/constants/Calling";

// Interface définissant la structure d'un élément de la liste de contacts
interface IListItem {
  title: string;       // Nom du contact ou du service
  description: string; // Description ou informations supplémentaires
  tel: string          // Numéro de téléphone à appeler
}

// Props du composant ListAppel avec données optionnelles
interface ListAppelProps {
  data?: IListItem[];  // Tableau d'éléments de contact (optionnel)
}

// Composant principal pour afficher une liste de contacts d'urgence
export const ListAppel = ({ data }: ListAppelProps): React.ReactElement => {
  // Utilise les données fournies ou des données par défaut si non spécifiées
  const listData = data || new Array(8).fill({
    title: 'Titre',
    description: 'Description',
    tel: '123456789',
  });

  // Composant d'icône de téléphone pour le bouton d'appel
  const PhoneIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name='phone-outline'
    />
  );

  // Rendu du bouton d'appel pour chaque élément de la liste
  const renderItemAccessory = (tel : string): React.ReactElement => (
    <Button
      size='medium'
      style={styles.button}
      accessoryLeft={PhoneIcon}
      appearance='filled'
      onPress={() => {handleEmergencyCall(tel).then()}}
    >{(evaProps: TextProps) => <Text {...evaProps} style={styles.buttonText}>Appeler</Text>}
    </Button>
  );

  // Icône de personne affichée à gauche de chaque élément
  const renderItemIcon = (props: IconProps): IconElement => (
    <Icon
      {...props}
      name='person'
      style={[props.style, styles.icon]}
    />
  );

  // Rendu du titre de chaque contact avec style personnalisé
  const renderTitle = (title: string): React.ReactElement => (
    <Text style={styles.title}>{title}</Text>
  );

  // Rendu de la description de chaque contact avec style personnalisé
  const renderDescription = (description: string): React.ReactElement => (
    <Text style={styles.description}>{description}</Text>
  );

  // Configuration du rendu pour chaque élément de la liste
  const renderItem = ({ item, index }: { item: IListItem; index: number }): React.ReactElement => (
    <ListItem
      title={() => renderTitle(item.title)}
      description={() => renderDescription(item.description)}
      accessoryLeft={renderItemIcon}
      accessoryRight={() => renderItemAccessory(item.tel)}
      style={styles.listItem}
      key={index}
    />
  );

  // Retourne le composant List avec tous les éléments configurés
  return (
    <List
      style={styles.container}
      data={listData}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

// Styles pour les différents éléments du composant
const styles = StyleSheet.create({
  // Style du conteneur principal de la liste
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  // Style du conteneur de contenu pour la liste
  contentContainer: {
    paddingBottom: 20,
  },
  // Style de chaque élément individuel de la liste
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
  // Style de l'icône de personne
  icon: {
    width: 40,
    height: 40,
  },
  // Style du titre de chaque contact
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // Style du texte de description
  description: {
    fontSize: 11,
    color: '#8F9BB3',
    lineHeight: 20,
  },
  // Style du bouton d'appel
  button: {
    borderRadius: 30,
    padding: 10,
    marginLeft: 10,
  },
  // Style du texte dans le bouton d'appel
  buttonText: {
    marginLeft: -4, // Réduit l'espace entre l'icône et le texte
    fontWeight: 'bold',
    color: '#fff',
  },
});