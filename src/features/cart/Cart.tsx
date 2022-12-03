import { Card, Group, Image, Text, Badge, Button } from '@mantine/core';
import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addOnCart, removeOnCart, removeFromCartOnCart } from './cartSlice'

export const Cart = () => {
    const [opened, setOpened] = useState(false);
    const cartAmount = useSelector((state: RootState) => state.cart.productsAmount)
    const cartProducts = useSelector((state: RootState) => state.cart.products)
    const cartPrice = useSelector((state: RootState) => state.cart.price)
    const dispatch = useDispatch();

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <FaShoppingCart size={24} style={{ cursor: 'pointer' }} onClick={() => setOpened(!opened)} /> {cartAmount}
            </div>
            {opened && (
                <div className="cart" style={{ position: 'fixed', top: '50px', height: '400px', width: '320px',backgroundColor:'#f9f9f9', overflowX: 'hidden', zIndex: '3', right: '0px', gap: '20px', border: '1px solid rgba(0,0,0,0.4)', borderRadius: '15px', boxShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
                    <Group position='apart' style={{ padding: '5px' }}>
                        <Badge color="green" size="lg" variant="filled" radius="sm" style={{ marginTop: '10px', justifySelf: 'center' }}>Total: ${cartPrice}</Badge>
                        <AiFillCloseCircle size={24} onClick={() => setOpened(!opened)} />
                    </Group>
                    {cartProducts.map((item: any) => (
                        <Card shadow='lg' withBorder style={{ padding: '5px' }}>
                            <Group position='apart'>
                                <Image
                                    width={50}
                                    height={50}
                                    radius={50}
                                    src={item.img}
                                    fit='contain'
                                    style={{ border: '1px solid rgba(0,0,0,0.4)', borderRadius: '50%', boxShadow: '1px 2px 2px rgba(0,0,0,0.2)' }}
                                />
                                <Group style={{ gap: '5px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                    <Text weight={400} size='xs' style={{ width: '120px' }}> {item.title} </Text>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', width: '80px' }}>
                                        <Button compact style={{ width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => dispatch(removeOnCart(item))}>-</Button>
                                        <Text size='xs'>{item.amount}</Text>
                                        <Button compact style={{ width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => dispatch(addOnCart(item))}>+</Button>
                                    </div>
                                    {item.amount === 0 && (
                                        <Button compact size='xs' onClick={() => dispatch(removeFromCartOnCart(item))}>Remove</Button>
                                    )}
                                </Group>
                                <Badge size='sm' style={{ width: '75px' }}> $ {item.totalPrice} </Badge>
                            </Group>

                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}