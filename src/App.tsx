import { ItemCard } from "./components/ItemCard";
import type { RootState } from "./app/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToStore } from "./features/products/productsSlice";
import { Cart } from "./features/cart/Cart";
import { Grid, Tabs } from "@mantine/core";
import { AiTwotoneShop } from "react-icons/ai";

function App() {
  var storeProducts: any = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = () => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      res.data.map((item: any) => {
        const newItem: Product = {
          title: item.title.replace(/^(.{13}[^\s]*).*/, "$1"),
          img: item.image,
          price: item.price,
          id: item.id,
          category: item.category.replace("'", "").replace(" ", "-"),
          amount: 1,
          totalPrice: item.price,
        };
        dispatch(addToStore(newItem));
        return newItem;
      });
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        boxSizing: "border-box",
        margin: "0",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "18px",
          fontSize: "20px",
        }}
      >
        <div className="up"><AiTwotoneShop size={60} /></div>
        <Cart />
      </header>
      <Tabs color="violet" variant="outline" defaultValue="all">
        <Tabs.List position="center">
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="womens-clothing">Women's Clothing</Tabs.Tab>
          <Tabs.Tab value="mens-clothing">Men's Clothing</Tabs.Tab>
          <Tabs.Tab value="electronics">Electronics</Tabs.Tab>
          <Tabs.Tab value="jeweleries">Jeweleries</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all" pt="xs">
          <Grid>
            <Grid.Col
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {!isLoading &&
                storeProducts.map((item: any) => (
                  <ItemCard props={item} key={item.id} />
                ))}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="womens-clothing" pt="xs">
          <Grid>
            <Grid.Col
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {!isLoading &&
                storeProducts
                  .filter(
                    (product: any) => product.category === "womens-clothing"
                  )
                  .map((item: any) => <ItemCard props={item} key={item.id} />)}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="mens-clothing" pt="xs">
          <Grid>
            <Grid.Col
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {!isLoading &&
                storeProducts
                  .filter(
                    (product: any) => product.category === "mens-clothing"
                  )
                  .map((item: any) => <ItemCard props={item} key={item.id} />)}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="electronics" pt="xs">
          <Grid>
            <Grid.Col
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {!isLoading &&
                storeProducts
                  .filter((product: any) => product.category === "electronics")
                  .map((item: any) => <ItemCard props={item} key={item.id} />)}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="jeweleries" pt="xs">
          <Grid>
            <Grid.Col
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {!isLoading &&
                storeProducts
                  .filter((product: any) => product.category === "jewelery")
                  .map((item: any) => <ItemCard props={item} key={item.id} />)}
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default App;

export interface Product {
  title: string;
  img: string;
  price: number;
  id: number;
  category: string;
  amount: number;
  totalPrice: number;
}
