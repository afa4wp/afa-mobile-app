import { Button } from 'native-base';
import React from 'react';

interface SearchButtonProps {
  searchType: string;
  setSearch: (searchType: string) => void;
  buttonText: string;
  search: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  searchType,
  setSearch,
  buttonText,
  search,
}) => {
  const isActive = search === searchType;

  return (
    <Button
      _pressed={{
        backgroundColor: 'schemaPressed.900',
      }}
      onPress={() => setSearch(searchType)}
      variant={!isActive ? 'outline' : undefined}
      bg={isActive ? 'mark.800' : 'mark.700'}
      _text={{
        color: isActive ? 'mark.700' : 'mark.800',
      }}
    >
      {buttonText}
    </Button>
  );
};

export default SearchButton;
