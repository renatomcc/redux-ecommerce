import { Product } from "../App"
import { useDispatch } from 'react-redux'
import { useState } from "react"
import { addToCart, removeFromCart } from '../features/cart/cartSlice'
import { Card, Image, Text, Badge, CardSection, Button, createPolymorphicComponent, CardSectionProps } from "@mantine/core"
import styled from "@emotion/styled"

interface IProduct {
    props: Product
}

const _StyledSection = styled(CardSection)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
`

const StyledSection = createPolymorphicComponent<'button', CardSectionProps>(_StyledSection);

export const ItemCard = (props: IProduct) => {
    const dispatch = useDispatch();
    const [itemAmount, setItemAmount] = useState(0)

    function handleItemChange(prop: boolean) {
        if (itemAmount === 0 && !prop) return
        if (prop) {
            setItemAmount(itemAmount + 1)
            dispatch(addToCart(props.props))
        }
        else {
            setItemAmount(itemAmount - 1)
            dispatch(removeFromCart(props.props))
        }
    }

    return (
        <Card shadow='lg' withBorder radius='md' style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center', gap: '5px', padding: '5px' }}>
            <Image
                src={props.props.img}
                width={200}
                height={250}
                alt={props.props.title}
                fit='scale-down'
            />
            <Text weight={500}>{props.props.title}</Text>
            <Badge radius='xs' color="green" variant="filled" size='lg' style={{ width: '100px' }}>$ {props.props.price}</Badge>
            <StyledSection>
                <Button onClick={() => handleItemChange(false)}>-</Button>
                {itemAmount}
                <Button onClick={() => handleItemChange(true)}>+</Button>
            </StyledSection>
        </Card>
    )
}

