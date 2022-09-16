import _styles from '@styles'
import React, { useEffect, useState } from 'react'
import { Button, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import ArrowHeader from 'components/ArrowHeader'
import modules from 'modules'
import { BOX_MARGIN, BOX_WIDTH, styles, WORD_BANK_HEIGHT } from './DragDropExerciseStyles'
import DragBox from './components/DragBox'
import HolderBox from './components/HolderBox'

type ItemStatus = 'answer' | 'question'
export interface Item {
  key: string,
  label: string,
  status: ItemStatus,
}
export interface Possition {
  key: string,
  x: number
  y: number
  width: number
  height: number
}
export interface Tile {
  key: string
  label: string
  x?: number
  y?: number
  originalX?: number
  originalY?: number
}
const items: Item[] = [
  {
    key: "bad0144d-95cb-4163-adcf-b727d1564a22",
    label: "ullamcorper",
    status: "question"
  }, {
    key: "33707a89-7489-4d07-a7f7-9e177b5a6193",
    label: "non",
    status: "question"
  }, {
    key: "66940f11-e052-4aef-8da2-379095ec818b",
    label: "maecenas",
    status: "answer"
  }, {
    key: "9afad823-e96d-485c-af81-d8f9d33885d1",
    label: "eleifend",
    status: "question"
  }, {
    key: "ef21d1c4-00d2-4adf-8e19-0c13ed733882",
    label: "aenean",
    status: "question"
  }, {
    key: "e00d23cd-d248-4cdf-be6c-1d1c02b07210",
    label: "eget",
    status: "answer"
  }, {
    key: "dbea9d97-cd9f-4f40-a1d7-08d33eb54e44",
    label: "aliquet",
    status: "answer"
  }, {
    key: "1f831e05-00e1-4cdf-9cc0-bd80ba78ab07",
    label: "duis",
    status: "question"
  }, {
    key: "c88b6f27-8d86-45ac-b0cf-1e41c316349a",
    label: "integer",
    status: "answer"
  }, {
    key: "18f26b7c-0a65-4034-87cc-9158f94cb7ce",
    label: "integer",
    status: "question"
  }, {
    key: "c6b6682f-1575-446e-a677-3462987a1306",
    label: "nulla",
    status: "question"
  }, {
    key: "0d948ee9-5baa-4118-81a9-27c138c83954",
    label: "ante",
    status: "question"
  }, {
    key: "05ad602b-d58c-4a14-8e96-008bc2e002eb",
    label: "felis",
    status: "answer"
  }, {
    key: "cda2cd22-7f17-4eae-a70f-ecb8b0143e82",
    label: "donec",
    status: "question"
  }, {
    key: "8e9f02fd-b9ed-4d9a-8863-1c0c8acb98cb",
    label: "faucibus",
    status: "question"
  }, {
    key: "029c3377-f8c5-4a9d-bb03-6c4bc425d8d1",
    label: "quis",
    status: "answer"
  }, {
    key: "88856bfd-b5a0-4c16-84f6-2b93cb4add1b",
    label: "duis",
    status: "question"
  }, {
    key: "8dfd38df-57d6-4a98-951b-d9d298a5f1c9",
    label: "eu",
    status: "question"
  }, {
    key: "f02246ae-c16e-466c-a70a-b015c3cdb483",
    label: "quis",
    status: "answer"
  }, {
    key: "cb1dcd47-3514-4695-b315-3e907bc40bad",
    label: "non",
    status: "question"
  }, {
    key: "4f9913c9-4969-429d-98a0-65b3cdc04a58",
    label: "ornare",
    status: "question"
  }, {
    key: "4c5edc9c-667b-481f-8ce6-27d18aa3e21e",
    label: "nec",
    status: "answer"
  }, {
    key: "ee4aee2b-449c-48b6-a707-c7c2f2770286",
    label: "a",
    status: "question"
  }, {
    key: "5397466b-e8a1-49b0-848d-7a59471a42b6",
    label: "leo",
    status: "question"
  }, {
    key: "072a7d64-2533-4dfa-a0b5-105872b89fe0",
    label: "lacinia",
    status: "answer"
  }, {
    key: "98d3130d-1475-4f49-9e4b-462f69ea6efd",
    label: "nisi",
    status: "question"
  }, {
    key: "af1b9c97-3f72-412f-b67d-3cc27cb682be",
    label: "nullam",
    status: "answer"
  }, {
    key: "118ca8db-3dd5-4c39-b239-51a6a506fb20",
    label: "maecenas",
    status: "question"
  }, {
    key: "905c5b65-fb33-4037-8b7d-c2acc2b623d5",
    label: "rutrum",
    status: "answer"
  }, {
    key: "b7aa3dc9-a683-4ac3-98e2-9846078634fd",
    label: "id",
    status: "question"
  }, {
    key: "17e9d1d1-46a7-4824-abf8-673bed302919",
    label: "ante",
    status: "answer"
  },
]
interface Props {

}

const DragDropExerciseScreen = (props: Props) => {
  const navigation = useNavigation()
  const [possitions, setPossitions] = useState<Possition[]>([])
  const [tiles, setTiles] = useState<Tile[]>([])

  const scrollY = useSharedValue(0)

  useEffect(() => {
    items
      .filter(f => f.status === 'answer')
      .map((i) => {
        setTiles(prev => {
          const t = [...prev, { key: i.key, label: i.label }]
          return t
        })
      })
  }, [])
  const measurement = (key: string, x: number, y: number, width: number, height: number) => {
    setPossitions(prev => {
      const po = [...prev, { key, x, y, width, height }]
      return po
    })
  }
  const tileMeasurement = (key: string, x: number, y: number) => {
    setTiles(prev => prev
      .map((i) => {
        if (i.key === key) {
          return {
            ...i,
            x,
            y,
          }
        }
        return i
      }))
  }

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.ground}>
        <View style={styles.content}>
          {items.map((item) => {
            return <HolderBox key={item.key} item={item} measurment={measurement} />
          })}
        </View>
      </View>

      {/* <View style={{
        flex: 1,
        position: 'absolute',
        backgroundColor: 'brown'
      }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          console.log(`height`, height)
        }}
      /> */}

      <Animated.View
        // style={
        //   {
        //     left: 0,
        //     bottom: 0,
        //     height: '20%',
        //     position: 'absolute',
        //     backgroundColor: 'yellow',
        //   }
        // }
        // scrollEventThrottle={16}
        // onScroll={scrollHandler}
        style={
          {
            bottom: 0,
            position: 'absolute',
            alignSelf: 'flex-end',
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: 'brown',
            height: WORD_BANK_HEIGHT,
            paddingHorizontal: BOX_MARGIN,
            width: modules.VIEW_PORT_WIDTH,
            // width: tiles.length * (BOX_WIDTH + BOX_MARGIN),
          }
        }
      // horizontal showsHorizontalScrollIndicator={false}
      >
        {tiles.map((item, index) => {
          return <DragBox
            scrollY={scrollY}
            item={item}
            index={index}
            possitions={possitions}
            tileMeasurement={tileMeasurement}
          />
        })}
      </Animated.View>
      <Button title="test" onPress={() => console.log(`possitions`, possitions)} />
      <View style={_styles.absoluteTop}>
        <ArrowHeader goBack={() => navigation.goBack()} title="Dynamic Drag Drop" />
      </View>
    </View>
  )
}

export default DragDropExerciseScreen
