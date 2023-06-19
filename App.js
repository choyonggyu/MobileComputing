import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, FlatList, Text, View, ScrollView, TouchableOpacity, Vibration, Alert, Image, Linking, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useNavigation } from '@react-navigation/stack';


const Stack = createStackNavigator();

const StormacheHealthSupplements = [
  {
    id: 1,
    title: '시카로미세스 보울라디 플러스 MOS',
    image: require('./image/storm1.png'),
    text1: '<함량>\n50억 사카로미세스 보울라디\n만난올리고당(MOS) 200mg etc..',
    text2: '\n<권장 섭취량> \n아침 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%8B%9C%EC%B9%B4%EB%A1%9C%EB%AF%B8%EC%84%B8%EC%8A%A4+%EB%B3%B4%EC%9A%B8%EB%9D%BC%EB%94%94&channel=user'
  },
  {
    id: 2,
    title: '자로우 도필러스 EPS 50억 120캡슐',
    image: require('./image/storm2.png'),
    text1: '<함량>\n락티카제이바실러스 람노서스R0011\n비피도박테리움 브레브 R0070 etc..',
    text2: '\n<권장 섭취량> \n1~2알',
    text3: 'https://www.coupang.com/np/search?q=%EC%9E%90%EB%A1%9C%EC%9A%B0%20%EB%8F%84%ED%95%84%EB%9F%AC%EC%8A%A4%20eps%20120&channel=auto'
  },
  {
    id: 3,
    title: '하이락 비피더스',
    image: require('./image/storm3.png'),
    text1: '<함량>\n60억 프로바이오틱스(유산균) etc..',
    text2: '\n<권장 섭취량> \n 아침 식전 1포',
    text3: 'https://www.coupang.com/np/search?component=&q=%ED%95%98%EC%9D%B4%EB%9D%BD+%EB%B9%84%ED%94%BC%EB%8D%94%EC%8A%A4&channel=user'
  },
  {
    id: 4,
    title: '생유산균 락토핏 골드 프로바이오틱스 아연',
    image: require('./image/storm4.png'),
    text1: '<함량>\n20억 프로바이오틱스(유산균)\n아연 2.55mg etc.. ',
    text2: '\n<권장 섭취량> \n 아침 식전 1포',
    text3: 'https://www.coupang.com/np/search?component=&q=%EB%9D%BD%ED%86%A0%ED%95%8F+%EC%83%9D+%EC%9C%A0%EC%82%B0%EA%B7%A0+%EA%B3%A8%EB%93%9C&channel=auto'
  }
];

const EyesHealthSupplements = [
  {
    id: 1,
    title: '트리플 스트렝스 오메가3 피쉬오일',
    image: require('./image/eyes1.png'),
    text1: '<함량>\n오메가3(EPA) 690mg \n오메가3(DHA) 260mg etc..',
    text2: '\n<권장 섭취량> \n 식후 1~2캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%ED%8A%B8%EB%A6%AC%ED%94%8C+%EC%8A%A4%ED%8A%B8%EB%9E%AD%EC%8A%A4+%EC%98%A4%EB%A9%94%EA%B0%803&channel=auto'
  },
  {
    id: 2,
    title: '알티지 부스터 오메가3',
    image: require('./image/eyes2.png'),
    text1: '<함량>\n오메가3 0.8g \n비타민E 3.3mg etc..',
    text2: '\n<권장 섭취량> \n 언제든 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%95%8C%ED%8B%B0%EC%A7%80+%EB%B6%80%EC%8A%A4%ED%84%B0+%EC%98%A4%EB%A9%94%EA%B0%803&channel=auto'
  },
  {
    id: 3,
    title: '초임계 알티지 오메가 에센스 1000',
    image: require('./image/eyes3.png'),
    text1: '<함량>\n오메가3 1.0g \n비타민D 15ug etc..',
    text2: '\n<권장 섭취량> \n 오전중, 식후 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%B4%88%EC%9E%84%EA%B3%84+%EC%95%8C%ED%8B%B0%EC%A7%80+%EC%98%A4%EB%A9%94%EA%B0%803&channel=auto'
  },
  {
    id: 4,
    title: '얼티메이트 오메가(소프트젤)',
    image: require('./image/eyes4.png'),
    text1: '<함량>\n오메가3 1.1g \n기타 오메가3 180mg etc..',
    text2: '\n<권장 섭취량> \n 언제든, 식후 2캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%96%BC%ED%8B%B0%EB%A9%94%EC%9D%B4%ED%8A%B8+%EC%98%A4%EB%A9%94%EA%B0%80&channel=user'
  }
];

const RiverHealthSupplements = [
  {
    id: 1,
    title: 'SAT',
    image: require('./image/river1.png'),
    text1: '<함량>\n밀크씨슬 300mg \n아티초크추출물 300mg etc..',
    text2: '\n<권장 섭취량> \n아침, 저녁 식후 1캡슐씩',
    text3: 'https://www.coupang.com/np/search?component=&q=SAT&channel=user'
  },
  {
    id: 2,
    title: '살리마린 밀크시슬 익스트랙트',
    image: require('./image/river2.png'),
    text1: '<함량>\n밀크씨슬 600mg etc..',
    text2: '\n<권장 섭취량> \n언제든 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%8B%A4%EB%A6%AC%EB%A7%88%EB%A6%B0+%EB%B0%80%ED%81%AC%EC%8B%9C%EC%8A%AC&channel=user'
  },
  {
    id: 3,
    title: '실리마린 컴플렉스',
    image: require('./image/river3.png'),
    text1: '<함량>\n밀크씨슬 240mg \n아티초크추출물 50mg etc..',
    text2: '\n<권장 섭취량> \n언제든 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%8B%A4%EB%A6%AC%EB%A7%88%EB%A6%B0+%EC%BB%B4%ED%94%8C%EB%A0%89%EC%8A%A4&channel=auto'
  },
  {
    id: 4,
    title: '유기농 밀크씨슬',
    image: require('./image/river4.png'),
    text1: '<함량>\n밀크씨슬 130mg etc..',
    text2: '\n<권장 섭취량> \n언제든 1정',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%9C%A0%EA%B8%B0%EB%86%8D+%EB%B0%80%ED%81%AC%EC%94%A8%EC%8A%AC&channel=user'
  }
];
const BestSupplements = [
  {
    id: 1,
    title: '트리플 스트렝스 오메가3 피쉬오일',
    image: require('./image/best1.png'),
    rank: 1,
    star: '4.73(1,169)',
    text1: '\n<함량>\n오메가3(EPA) 690mg \n오메가3(DHA) 260mg etc..',
    text2: '\n<권장 섭취량> \n 식후 1~2캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%ED%8A%B8%EB%A6%AC%ED%94%8C+%EC%8A%A4%ED%8A%B8%EB%9E%AD%EC%8A%A4+%EC%98%A4%EB%A9%94%EA%B0%803&channel=auto' 
  },
  {
    id: 2,
    title: 'SAT',
    image: require('./image/best2.png'),
    rank: 2,
    star: '4.77(738)',
    text1: '<함량>\n밀크씨슬 300mg \n아티초크추출물 300mg etc..',
    text2: '\n<권장 섭취량> \n아침, 저녁 식후 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=SAT&channel=user'
  },
  {
    id: 3,
    title: '칼슘 마그네슘 말레이트',
    image: require('./image/best3.png'),
    rank: 3,
    star: '4.7(572)',
    text1: '<함량>\n칼슘 300mg \n마그네슘 300mg etc..',
    text2: '\n<권장 섭취량> \n아침, 점심, 저녁 식후 1캡슐',
    text3: 'https://www.coupang.com/np/search?component=&q=%EC%B9%BC%EC%8A%98+%EB%A7%88%EA%B7%B8%EB%84%A4%EC%8A%98+%EB%A7%90%EB%A0%88%EC%9D%B4%ED%8A%B8&channel=user'
  },
  {
    id: 4,
    title: '락토비프 프로바이오틱스 300억',
    image: require('./image/best4.png'),
    rank: 4,
    star: '4.69(906)',
    text1: '<함량>\n프리바이오틱스 300억 CFU etc..',
    text2: '\n<권장 섭취량> \n아침 식전 1캡슐',
    text3: 'https://www.coupang.com/np/search?q=%EB%9D%BD%ED%86%A0%EB%B9%84%ED%94%84%20%ED%94%84%EB%A1%9C%EB%B0%94%EC%9D%B4%EC%98%A4%ED%8B%B1%EC%8A%A4%20300%EC%96%B5&channel=auto'
  },
  {
    id: 5,
    title: '익스트림 블랙마카 1800',
    image: require('./image/best5.png'),
    rank: 5,
    star: '4.63(290)',
    text1: '<함량>\n마카 1816mg \n흑마늘 400mg etc..',
    text2: '\n<권장 섭취량> \n아침, 저녁 2캡슐',
    text3: 'https://www.coupang.com/np/search?q=%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%A6%BC%20%EB%B8%94%EB%9E%99%EB%A7%88%EC%B9%B4%201800&channel=auto'
  }
]

// 첫 번째 화면 컴포넌트
const HomeScreen = ({ navigation }) => {
  const [isVibrating, setIsVibrating] = useState(false);
  const intervalRef = useRef(null);
  

  const handleOKButton = () => {
    setIsVibrating(false);
    Vibration.cancel();
  };

  const handleRecommendation1 = () => {
    const recommendationResult = '알람 설정';
    setIsVibrating(true);
    navigation.navigate('Recommendation', { recommendationResult });

    Alert.alert(
      '알림',
      '알람 기능이 동작했습니다.',
      [
        { text: 'OK', onPress: handleOKButton }
      ],
      { onDismiss: handleOKButton }
    );
  };

  useEffect(() => {
    if (isVibrating) {
        intervalRef.current = setInterval(() => {
        Vibration.vibrate();
      }, 1000); // 1초마다 진동 반복
    }

    return () => {
      clearInterval(intervalRef.current);
      Vibration.cancel();
    };
  }, [isVibrating]);

  const handleRecommendation2 = () => {
    const recommendationResult1 = StormacheHealthSupplements;
    navigation.navigate('Recommendation1', { recommendationResult1 });
  };


  const handleRecommendation3 = () => {
    const recommendationResult2 = '세번째 결과';
    navigation.navigate('Recommendation2', { recommendationResult2 });
  };

  

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRecommendation1}>
          <Text style={styles.buttonText}>알람</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleRecommendation2}>
          <Text style={styles.buttonText}>종류</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleRecommendation3}>
          <Text style={styles.buttonText}>일일 섭취량</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer1}>
        <Text style={styles.title}>★랭킹★</Text>
        

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { item: BestSupplements[0] })}
        >
          <Image source={BestSupplements[0].image} style={styles.image} />
          <Text>{BestSupplements[0].title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { item: BestSupplements[1] })}
        >
          <Image source={BestSupplements[1].image} style={styles.image} />
          <Text>{BestSupplements[1].title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { item: BestSupplements[2] })}
        >
          <Image source={BestSupplements[2].image} style={styles.image} />
          <Text>{BestSupplements[2].title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { item: BestSupplements[3] })}
        >
          <Image source={BestSupplements[3].image} style={styles.image} />
          <Text>{BestSupplements[3].title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { item: BestSupplements[4] })}
        >
          <Image source={BestSupplements[4].image} style={styles.image} />
          <Text>{BestSupplements[4].title}</Text>
        </TouchableOpacity>
          
      </ScrollView>
    </View>
  );
};

// 두 번째 화면 컴포넌트
const RecommendationScreen = ({ route }) => {
  const { recommendationResult } = route.params;

  
  return (
    <View style={styles.container}>
      <Text>{recommendationResult}</Text>
    </View>
  );
  
};

// 세 번째 화면 컴포넌트
const RecommendationScreen2 = ({route, navigation}) => {
  const { recommendationResult1 } = route.params;

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>장 건강 영양제</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: recommendationResult1[0] })}
          >
            <Image source={recommendationResult1[0].image} style={styles.image} />
            <Text>{recommendationResult1[0].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: recommendationResult1[1] })}
          >
            <Image source={recommendationResult1[1].image} style={styles.image} />
            <Text>{recommendationResult1[1].title}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: recommendationResult1[2] })}
          >
            <Image source={recommendationResult1[2].image} style={styles.image} />
            <Text>{recommendationResult1[2].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: recommendationResult1[3] })}
          >
            <Image source={recommendationResult1[3].image} style={styles.image} />
            <Text>{recommendationResult1[3].title}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>눈 건강 영양제</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: EyesHealthSupplements[0] })}
          >
            <Image source={EyesHealthSupplements[0].image} style={styles.image} />
            <Text>{EyesHealthSupplements[0].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: EyesHealthSupplements[1] })}
          >
            <Image source={EyesHealthSupplements[1].image} style={styles.image} />
            <Text>{EyesHealthSupplements[1].title}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: EyesHealthSupplements[2] })}
          >
            <Image source={EyesHealthSupplements[2].image} style={styles.image} />
            <Text>{EyesHealthSupplements[2].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: EyesHealthSupplements[3] })}
          >
            <Image source={EyesHealthSupplements[3].image} style={styles.image} />
            <Text>{EyesHealthSupplements[3].title}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>간 건강 영양제</Text>

        <View style={styles.row}>
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: RiverHealthSupplements[0] })}
          >
            <Image source={RiverHealthSupplements[0].image} style={styles.image} />
            <Text>{RiverHealthSupplements[0].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: RiverHealthSupplements[1] })}
          >
            <Image source={RiverHealthSupplements[1].image} style={styles.image} />
            <Text>{RiverHealthSupplements[1].title}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: RiverHealthSupplements[2] })}
          >
            <Image source={RiverHealthSupplements[2].image} style={styles.image} />
            <Text>{RiverHealthSupplements[2].title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Detail', { item: RiverHealthSupplements[3] })}
          >
            <Image source={RiverHealthSupplements[3].image} style={styles.image} />
            <Text>{RiverHealthSupplements[3].title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


const RecommendationScreen3 = () => {

  const [userInput1, setUserInput1] = useState(''); // 사용자의 입력 값을 저장하는 상태
  const [userInput2, setUserInput2] = useState('');
  const [userInput3, setUserInput3] = useState('');
  const [userInput4, setUserInput4] = useState('');
  const [userInput5, setUserInput5] = useState('');
  const [userInput6, setUserInput6] = useState('');

  const handleInputChange1 = (value) => {
    setUserInput1(value);
  };
  const handleInputChange2 = (value) => {
    setUserInput2(value);
  };
  const handleInputChange3 = (value) => {
    setUserInput3(value);
  };
  const handleInputChange4 = (value) => {
    setUserInput4(value);
  };
  const handleInputChange5 = (value) => {
    setUserInput5(value);
  };
  const handleInputChange6 = (value) => {
    setUserInput6(value);
  };

  const calculateRemaining = (amount, input) => {
    const recommendedAmount = parseFloat(amount);
    const userAmount = parseFloat(input);
    const remainingAmount = recommendedAmount - userAmount;

    return remainingAmount.toFixed(2); // 소수점 둘째 자리까지 표시
  };

  const tableData1 =[
    {
      '영양소': '비타민 A',
      '일일 섭취량': '750ug',
      '내가 먹는 양': userInput1,
      '남은 섭취량': calculateRemaining('750', userInput1),
    },
  ];
  const tableData2 =[
    {
      '영양소': '비타민 B1',
      '일일 섭취량': '1.2mg',
      '내가 먹는 양': userInput2,
      '남은 섭취량': calculateRemaining('1.2', userInput2),
    },
  ]
  const tableData3 =[
    {
      '영양소': '비타민 C',
      '일일 섭취량': '100mg',
      '내가 먹는 양': userInput3,
      '남은 섭취량': calculateRemaining('100', userInput3),
    },
  ]
  const tableData4 =[
    {
      '영양소': '비타민 D',
      '일일 섭취량': '200IU',
      '내가 먹는 양': userInput4,
      '남은 섭취량': calculateRemaining('200', userInput4),
    },
  ]
  const tableData5 =[
    {
      '영양소': '프로바이오틱스',
      '일일 섭취량': '100억CFU',
      '내가 먹는 양': userInput5,
      '남은 섭취량': calculateRemaining('100', userInput5),
    },
  ]
  const tableData6 =[
    {
      '영양소': '밀크씨슬',
      '일일 섭취량': '500mg',
      '내가 먹는 양': userInput6,
      '남은 섭취량': calculateRemaining('500', userInput6),
    },
  ]


  return (
    <View style={styles.container}>
      <Text style={styles.title}>영양소 계산 도구!</Text>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData1.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>영양소</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>일일 권장량</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>내가 섭취한 양</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>추가 섭취 가능한 양</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData1.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange1}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}ug</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData2.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange2}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}mg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData3.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange3}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}mg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData4.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange4}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}IU</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData5.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange5}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}(억)CFU</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal>
        <View style={styles.tableRow}>
          {tableData6.map((item, index) => (
            <View style={styles.tableCell} key={index}>
              <View style={styles.rowContainer}>
                <Text style={[styles.cellText, {marginRight:20}]}>●  {item.영양소}</Text>
                <Text style={[styles.cellText, {marginRight:20}]}>{item['일일 섭취량']}</Text>
                <TextInput
                  style={[styles.input, {marginRight:20}]}
                  value={item['내가 먹는 양']}
                  onChangeText={handleInputChange6}
                />
                <Text style={[styles.cellText, {marginRight:20}]}>{item['남은 섭취량']}mg</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};


const DetailScreen = ({ route }) => {
  const { item } = route.params;

  const handleLinkPress = () => {
    Linking.openURL(item.text3);
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style = {styles.title}>{item.title}</Text>
      <Text>{item.text1}</Text>
      <Text>{item.text2}</Text>
      <TouchableOpacity onPress = {handleLinkPress}>
        <Text style = {styles.buyButton}>구매하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recommendation" component={RecommendationScreen} />
        <Stack.Screen name="Recommendation1" component={RecommendationScreen2} />
        <Stack.Screen name="Recommendation2" component={RecommendationScreen3} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 8,
    margin: 10
  },
  scrollContainer1: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 20,
    margin: 10,
    width: '1000%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    testAlign: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    top: 0, 
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    MarginBottom: 10,
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  supplementItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  supplementImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  supplementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supplementRank: {
    fontSize: 14,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  buyButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue', // 버튼의 색상을 변경하려면 이 부분을 수정하세요
    marginTop: 20,
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  tableHeaderText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRowText: {
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row', // 가로 방향으로 나열
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },

  input: {
    borderWidth: 1, // 경계선 두께
    borderColor: 'black', // 경계선 색상
    borderRadius: 4, // 경계선 둥글기
    padding: 6, // 내부 여백
  },
});