import React from 'react';
import { SafeAreaView, View, Text, FlatList, Image, Pressable, Modal, ScrollView, Platform } from 'react-native';
import { CATALOG } from './src/catalog';
import { CartLine, enrich, totals, formatUSD } from './src/cart';
import Row from './src/components/Row';

export default function App(){
  const [query, setQuery] = React.useState('');
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [checkingOut, setCheckingOut] = React.useState(false);
  const [orderId, setOrderId] = React.useState<string|null>(null);

  const products = React.useMemo(()=>{
    const q = query.trim().toLowerCase();
    if(!q) return CATALOG;
    return CATALOG.filter(p => [p.title, String(p.price), p.id].some(x => x.toLowerCase().includes(q)));
  },[query]);

  const lines = React.useMemo(()=> enrich(cart, CATALOG), [cart]);
  const { subtotal, tax, total } = totals(lines);

  const add = (id:string)=> setCart(prev => {
    const i = prev.findIndex(l => l.id === id);
    if(i === -1) return [...prev, { id, qty:1 }];
    const next = [...prev];
    next[i] = { ...next[i], qty: next[i].qty + 1 };
    return next;
  });
  const dec = (id:string)=> setCart(prev => {
    const i = prev.findIndex(l => l.id === id);
    if(i === -1) return prev;
    const next = [...prev];
    const q = next[i].qty - 1;
    if(q <= 0) return next.filter(l => l.id !== id);
    next[i] = { ...next[i], qty: q };
    return next;
  });
  const remove = (id:string)=> setCart(prev => prev.filter(l => l.id !== id));
  const clear = ()=> setCart([]);

  const placeOrder = ()=>{
    const id = 'ORD-' + Math.random().toString(36).slice(2,8).toUpperCase();
    setOrderId(id);
    clear();
    setCheckingOut(false);
  };

  return (
    <SafeAreaView style={{ flex:1, backgroundColor:'#111' }}>
      {/* Header */}
      <View style={{ padding:16, backgroundColor:'#000', flexDirection:'row', alignItems:'center' }}>
        <Text style={{ color:'#FACC15', fontSize:20, fontWeight:'800' }}>High On Bachata — Shop</Text>
        <View style={{ marginLeft:'auto' }}>
          <Text style={{ color:'#fff' }}>Cart: {cart.reduce((s,x)=>s+x.qty,0)}</Text>
        </View>
      </View>

      {/* Success banner */}
      {orderId && (
        <View style={{ marginHorizontal:16, marginTop:12, backgroundColor:'#E8F5E9', borderRadius:14, padding:12 }}>
          <Text>✅ Order <Text style={{ fontWeight:'700' }}>{orderId}</Text> placed successfully! (Demo)</Text>
        </View>
      )}

      {/* Body */}
      <View style={{ flex:1, backgroundColor:'#fff', borderTopLeftRadius:24, borderTopRightRadius:24, padding:16 }}>
        <Text style={{ fontSize:16, fontWeight:'700', marginBottom:8 }}>Products</Text>
        <FlatList
          data={products}
          keyExtractor={(i)=>i.id}
          contentContainerStyle={{ paddingBottom:24 }}
          renderItem={({item})=> (
            <View style={{ marginBottom:12, borderRadius:16, overflow:'hidden', borderColor:'#eee', borderWidth:1 }}>
              <Image source={{ uri:item.image }} style={{ height:180, width:'100%' }} />
              <View style={{ padding:12, flexDirection:'row', alignItems:'center' }}>
                <View style={{ flex:1 }}>
                  <Text style={{ fontWeight:'700' }}>{item.title}</Text>
                  <Text style={{ color:'#555' }}>{formatUSD(item.price)}</Text>
                </View>
                <Pressable onPress={()=>add(item.id)} style={{ backgroundColor:'#FACC15', paddingHorizontal:14, paddingVertical:10, borderRadius:12 }}>
                  <Text>Add</Text>
                </Pressable>
              </View>
            </View>
          )}
        />

        {/* Cart Summary */}
        <View style={{ borderTopWidth:1, borderColor:'#eee', paddingTop:12 }}>
          <Text style={{ fontSize:16, fontWeight:'700', marginBottom:8 }}>Your Cart</Text>
          {lines.length === 0 ? (
            <Text style={{ color:'#666' }}>Cart is empty. Add something you like!</Text>
          ) : (
            <View>
              {lines.map(x => (
                <View key={x.id} style={{ flexDirection:'row', alignItems:'center', marginBottom:8 }}>
                  <Text style={{ flex:1 }}>{x.title} × {x.qty}</Text>
                  <Pressable onPress={()=>dec(x.id)} style={{ borderWidth:1, borderColor:'#ddd', paddingHorizontal:10, paddingVertical:6, borderRadius:8, marginRight:6 }}><Text>−</Text></Pressable>
                  <Pressable onPress={()=>add(x.id)} style={{ borderWidth:1, borderColor:'#ddd', paddingHorizontal:10, paddingVertical:6, borderRadius:8, marginRight:6 }}><Text>+</Text></Pressable>
                  <Pressable onPress={()=>remove(x.id)} style={{ paddingHorizontal:10, paddingVertical:6 }}><Text>Remove</Text></Pressable>
                </View>
              ))}
              <View style={{ gap:6 }}>
                <Row label="Subtotal" value={formatUSD(subtotal)} />
                <Row label="Tax (est.)" value={formatUSD(tax)} />
                <Row label="Total" value={formatUSD(total)} bold />
              </View>
              <Pressable
                onPress={()=>setCheckingOut(true)}
                style={{ marginTop:12, backgroundColor:'#000', padding:14, borderRadius:12 }}>
                <Text style={{ color:'#fff', textAlign:'center', fontWeight:'700' }}>Checkout</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {/* Checkout modal */}
      <Modal visible={checkingOut} animationType="slide" transparent>
        <View style={{ flex:1, backgroundColor:'#0008', justifyContent:'center', padding:16 }}>
          <View style={{ backgroundColor:'#fff', borderRadius:16, overflow:'hidden' }}>
            <View style={{ padding:14, borderBottomWidth:1, borderColor:'#eee', flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={{ fontWeight:'700' }}>Review & Place Order</Text>
              <Pressable onPress={()=>setCheckingOut(false)}><Text>Close</Text></Pressable>
            </View>
            <ScrollView style={{ maxHeight: Platform.OS === 'web' ? 420 : 420, padding:14 }}>
              {lines.length === 0 ? (
                <Text style={{ color:'#666' }}>Your cart is empty.</Text>
              ) : (
                <View>
                  {lines.map(x => (
                    <View key={x.id} style={{ flexDirection:'row', justifyContent:'space-between', marginBottom:6 }}>
                      <Text numberOfLines={1} style={{ flex:1 }}>{x.title} × {x.qty}</Text>
                      <Text style={{ fontWeight:'600' }}>{formatUSD(x.lineTotal)}</Text>
                    </View>
                  ))}
                </View>
              )}
              <View style={{ marginTop:8, borderTopWidth:1, borderColor:'#eee', paddingTop:8, gap:6 }}>
                <Row label="Subtotal" value={formatUSD(subtotal)} />
                <Row label="Tax (est.)" value={formatUSD(tax)} />
                <Row label="Total" value={formatUSD(total)} bold />
              </View>
            </ScrollView>
            <View style={{ padding:14, borderTopWidth:1, borderColor:'#eee' }}>
              <Pressable onPress={placeOrder} style={{ backgroundColor:'#FACC15', padding:14, borderRadius:12 }}>
                <Text style={{ fontWeight:'800', textAlign:'center' }}>Place Order (Demo)</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
