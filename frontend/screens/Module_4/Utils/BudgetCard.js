import { View, Text } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const BudgetCard = ({usedAmount, totalAmount}) => {
  return (
      <View style={[styles.columnContainer, { gap: 10 }]}>
          <View style={[styles.columnContainer]}>
              <Text style={[styles.cardTitle, { color: colors.black, fontSize: 18 }]}>Clothing</Text>

              <View
                  style={[
                      styles.rowContainer,
                      {
                          justifyContent: 'space-between',
                          alignItems: 'center',
                      },
                  ]}
              >
                  <Text
                      style={[
                          {
                              fontFamily: fonts.interRegular,
                              color: colors.black,
                              fontSize: 18,
                              flex: 1,
                          },
                      ]}
                  >
                      RM100 Spent
                  </Text>
                  <Text
                      style={[
                          {
                              fontFamily: fonts.interRegular,
                              color: colors.black,
                              fontSize: 18,
                          },
                      ]}
                  >
                      RM500
                  </Text>
              </View>
          </View>
          <Progress.Bar
              progress={1}
              color="#FFD1D3"
              height={sh(10)}
              width={sw(370)}
          />
      </View>
  );
}

export default BudgetCard;

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: sw(24),
        paddingVertical: sh(15),
        marginVertical: sh(15),
        marginHorizontal: sw(20),
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    balanceContainer: {
        flexDirection: 'column',
        gap: 4,
    },
    cardTitle: {
        fontFamily: fonts.interSemiBold,

        color: colors.white,
    },
    cardDescription: {
        fontFamily: fonts.interSemiBold,
        color: colors.white,
    },
    rowContainer: { flexDirection: 'row' },
    columnContainer: { flexDirection: 'column' },
    subTitleContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    subTitleText: {
        fontFamily: fonts.interMedium,
        color: colors.white,
    },
    chartContainer: {
        // marginHorizontal: sw(10),
        // borderColor: "black",
        // borderWidth: 1,
        padding: sw(20),
        flexDirection: 'column',
    },
});