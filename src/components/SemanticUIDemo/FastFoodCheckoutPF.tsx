import * as React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Title,
  Stack,
  StackItem,
  TextInput,
  Grid,
  GridItem,
  Badge,
  Spinner,
  Modal,
  ModalVariant,
  Text,
  Divider,
} from '@patternfly/react-core';
import { ShoppingCartIcon, CheckCircleIcon } from '@patternfly/react-icons';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  isCombo: boolean;
  customizable: boolean;
  options?: { [key: string]: string[] };
}

interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions?: { [key: string]: string };
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Classic Burger Combo',
    price: 8.99,
    description: 'Burger, fries, and drink',
    isCombo: true,
    customizable: false,
  },
  {
    id: '2',
    name: 'Build Your Own Burger',
    price: 7.99,
    description: 'Customize your perfect burger',
    isCombo: false,
    customizable: true,
    options: {
      patty: ['Single', 'Double', 'Triple'],
      cheese: ['None', 'American', 'Swiss', 'Cheddar'],
      toppings: ['Lettuce', 'Tomato', 'Onion', 'Pickles', 'Bacon'],
      bun: ['Sesame', 'Wheat', 'Lettuce Wrap'],
    },
  },
  {
    id: '3',
    name: 'Chicken Nuggets Combo',
    price: 6.99,
    description: '10 piece nuggets, fries, and drink',
    isCombo: true,
    customizable: false,
  },
  {
    id: '4',
    name: 'Custom Salad',
    price: 6.49,
    description: 'Build your perfect salad',
    isCombo: false,
    customizable: true,
    options: {
      base: ['Iceberg', 'Romaine', 'Spinach', 'Spring Mix'],
      protein: ['Grilled Chicken', 'Crispy Chicken', 'None'],
      dressing: ['Ranch', 'Caesar', 'Italian', 'Vinaigrette'],
    },
  },
];

export const FastFoodCheckoutPF: React.FunctionComponent = () => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [customizingItem, setCustomizingItem] = React.useState<MenuItem | null>(null);
  const [customSelections, setCustomSelections] = React.useState<{ [key: string]: string }>({});
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddToCart = (item: MenuItem) => {
    if (item.customizable) {
      setCustomizingItem(item);
      setCustomSelections({});
      setModalOpen(true);
    } else {
      const existingItem = cart.find(c => c.id === item.id && !c.customizable);
      if (existingItem) {
        setCart(cart.map(c => 
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        ));
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
    }
  };

  const handleCompleteCustomization = () => {
    if (customizingItem) {
      const customId = `${customizingItem.id}-${Date.now()}`;
      setCart([...cart, {
        ...customizingItem,
        id: customId,
        name: `${customizingItem.name} (Custom)`,
        selectedOptions: { ...customSelections },
        quantity: 1,
      }]);
      setModalOpen(false);
      setCustomizingItem(null);
      setCustomSelections({});
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div style={{ padding: '20px' }}>
      <Title headingLevel="h1" size="xl" style={{ marginBottom: '20px' }}>
        Fast Food Checkout - PatternFly Only
      </Title>

      <Grid hasGutter>
        <GridItem span={8}>
          <Stack hasGutter>
            <StackItem>
              <Title headingLevel="h2" size="lg">Menu</Title>
            </StackItem>
            {menuItems.map((item) => (
              <StackItem key={item.id}>
                <Card>
                  <CardHeader>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Title headingLevel="h3" size="md">{item.name}</Title>
                        {item.isCombo && <Badge>Combo Meal</Badge>}
                      </div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                    <div style={{ marginTop: '15px' }}>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        variant="primary"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </StackItem>
            ))}
          </Stack>
        </GridItem>

        <GridItem span={4}>
          <Card>
            <CardHeader>
              <Title headingLevel="h3" size="md">
                <ShoppingCartIcon style={{ marginRight: '8px' }} />
                Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
              </Title>
            </CardHeader>
            <CardBody>
              {cart.length === 0 ? (
                <Text>Your cart is empty</Text>
              ) : (
                <Stack hasGutter>
                  {cart.map((item) => (
                    <StackItem key={item.id}>
                      <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <Text component="strong">{item.name}</Text>
                          <Button
                            variant="plain"
                            onClick={() => handleRemoveFromCart(item.id)}
                            style={{ padding: '0', minWidth: 'auto' }}
                          >
                            ×
                          </Button>
                        </div>
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                            {Object.entries(item.selectedOptions).map(([key, value]) => (
                              <div key={key}>{key}: {value}</div>
                            ))}
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Button
                              variant="plain"
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              isDisabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <Text>{item.quantity}</Text>
                            <Button
                              variant="plain"
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Text component="strong">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Text>
                        </div>
                      </div>
                    </StackItem>
                  ))}
                  <StackItem>
                    <Divider />
                  </StackItem>
                  <StackItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Subtotal:</Text>
                      <Text>${subtotal.toFixed(2)}</Text>
                    </div>
                  </StackItem>
                  <StackItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Tax:</Text>
                      <Text>${tax.toFixed(2)}</Text>
                    </div>
                  </StackItem>
                  <StackItem>
                    <Divider />
                  </StackItem>
                  <StackItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text component="strong">Total:</Text>
                      <Text component="strong">${total.toFixed(2)}</Text>
                    </div>
                  </StackItem>
                  <StackItem>
                    <Button variant="primary" isLarge block>
                      Checkout
                    </Button>
                  </StackItem>
                </Stack>
              )}
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {customizingItem && (
        <Modal
          variant={ModalVariant.medium}
          title={`Customize ${customizingItem.name}`}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setCustomizingItem(null);
            setCustomSelections({});
          }}
          actions={[
            <Button key="cancel" variant="secondary" onClick={() => {
              setModalOpen(false);
              setCustomizingItem(null);
              setCustomSelections({});
            }}>
              Cancel
            </Button>,
            <Button key="add" variant="primary" onClick={handleCompleteCustomization}>
              Add to Cart
            </Button>,
          ]}
        >
          <Form>
            {customizingItem.options && Object.entries(customizingItem.options).map(([optionKey, options]) => (
              <FormGroup key={optionKey} label={optionKey.charAt(0).toUpperCase() + optionKey.slice(1)} fieldId={optionKey}>
                <FormSelect
                  value={customSelections[optionKey] || ''}
                  onChange={(value) => {
                    setCustomSelections({ ...customSelections, [optionKey]: value });
                  }}
                  id={optionKey}
                  name={optionKey}
                >
                  <FormSelectOption value="" label={`Select ${optionKey}`} />
                  {options.map((option) => (
                    <FormSelectOption key={option} value={option} label={option} />
                  ))}
                </FormSelect>
              </FormGroup>
            ))}
          </Form>
        </Modal>
      )}
    </div>
  );
};



