// screens/TransactionHistoryScreen.tsx

import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useApp } from '../context/AppContext';
import { TransactionItem } from '../components/TransactionItem';

const ITEMS_PER_PAGE = 10;

export const TransactionHistoryScreen = () => {
  const { state } = useApp();
  const [currentPage, setCurrentPage] = useState(1);

  const { paginatedTransactions, totalPages } = useMemo(() => {
    const total = Math.ceil(state.transactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = state.transactions.slice(startIndex, endIndex);

    return {
      paginatedTransactions: paginated,
      totalPages: total,
    };
  }, [state.transactions, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const transactionStats = useMemo(() => {
    return {
      total: state.transactions.length,
      creates: state.transactions.filter(t => t.type === 'create').length,
      adds: state.transactions.filter(t => t.type === 'add').length,
      removes: state.transactions.filter(t => t.type === 'remove').length,
    };
  }, [state.transactions]);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Transaction History
          </Text>
          <Text className="text-gray-600 mb-4">
            Complete record of all inventory changes
          </Text>

          {/* Statistics */}
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-blue-50 px-3 py-2 rounded-lg">
              <Text className="text-blue-800 font-semibold">
                Total: {transactionStats.total}
              </Text>
            </View>
            <View className="bg-green-50 px-3 py-2 rounded-lg">
              <Text className="text-green-800 font-semibold">
                Added: {transactionStats.adds}
              </Text>
            </View>
            <View className="bg-red-50 px-3 py-2 rounded-lg">
              <Text className="text-red-800 font-semibold">
                Removed: {transactionStats.removes}
              </Text>
            </View>
            <View className="bg-purple-50 px-3 py-2 rounded-lg">
              <Text className="text-purple-800 font-semibold">
                Created: {transactionStats.creates}
              </Text>
            </View>
          </View>
        </View>

        {state.transactions.length === 0 ? (
          <View className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <Text className="text-blue-800 text-center">
              No transactions yet. Register products and adjust stock to see history!
            </Text>
          </View>
        ) : (
          <>
            <View className="mb-4">
              <Text className="text-lg font-bold text-gray-900 mb-3">
                Transactions (Page {currentPage} of {totalPages})
              </Text>
              {paginatedTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </View>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <View className="bg-white rounded-lg p-4 shadow-sm">
                <View className="flex-row justify-between items-center">
                  <TouchableOpacity
                    onPress={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600'
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        currentPage === 1 ? 'text-gray-400' : 'text-white'
                      }`}
                    >
                      ← Previous
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </Text>
                    <View className="bg-gray-100 px-3 py-1 rounded">
                      <Text className="text-gray-700 font-semibold">
                        {state.transactions.length} total
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages ? 'bg-gray-200' : 'bg-blue-600'
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        currentPage === totalPages ? 'text-gray-400' : 'text-white'
                      }`}
                    >
                      Next →
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};
