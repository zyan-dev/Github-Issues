import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ReadMore from 'react-native-read-more-text';
import {Container} from 'native-base';
import {AppState} from '../../redux/rootReducer';
import MyHeader from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import {dySize} from '../../utils/responsive';
import {fetchIssues, fetchMoreIssues} from '../../redux/home/actions';
import Loader from '../../components/LoadingView';
import themes from '../../utils/themes';
import NavigationServices from '../../navigation/NavigationServices';

interface IssueListScreenProps {
  route: any;
}

const IssueListScreen: React.FC<IssueListScreenProps> = ({route}) => {
  const [searchText, setSearchText] = useState('');
  const [dragging, setDragging] = useState(false);
  const dispatch = useDispatch();
  const {loading} = useSelector((state: AppState) => state.router);
  const {issues, issueError, issueEndReached} = useSelector(
    (state: AppState) => state.home,
  );

  useEffect(() => {
    const {org, repo} = route.params;
    dispatch(fetchIssues(org, repo));
  }, []);

  const onEndReached = () => {
    const {org, repo} = route.params;
    if (dragging && !issueEndReached) {
      dispatch(fetchMoreIssues(org, repo));
      setDragging(false);
    }
  };

  const _renderTruncatedFooter = (handlePress: any) => {
    return (
      <Text style={styles.readmoreText} onPress={handlePress}>
        Read More
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress: any) => {
    return (
      <Text style={styles.readmoreText} onPress={handlePress}>
        Show Less
      </Text>
    );
  };

  const renderIssueItem = (item: any) => {
    const issue = item.item;
    return (
      <View style={styles.issueItem}>
        <View style={styles.avatarView}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: issue.user.avatar_url,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text style={styles.name}>{issue.user.login}</Text>
          <Text
            style={[
              styles.issueText,
              {backgroundColor: issue.state === 'open' ? 'blue' : 'red'},
            ]}>
            {issue.state}
          </Text>
        </View>
        <Text style={styles.issueTitle}>{issue.title}</Text>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}>
          <Text style={styles.description}>
            {issue.body || 'No description'}
          </Text>
        </ReadMore>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <MyHeader
        title="Issues"
        onPressLeft={() => NavigationServices.goBack()}
      />
      <View style={styles.searchView}>
        <SearchInput
          placeholder="Search by issue title"
          onChange={setSearchText}
          width={dySize(355)}
          style={{marginRight: 5}}
        />
      </View>
      {issueError.length > 0 && <Text style={styles.error}>{issueError}</Text>}
      {issueError.length === 0 && (
        <FlatList
          data={issues.filter(i =>
            i.title.toLowerCase().includes(searchText.toLowerCase()),
          )}
          renderItem={renderIssueItem}
          keyExtractor={i => i.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {!!searchText.length ? 'No results' : 'No issues'}
            </Text>
          }
          ListFooterComponent={
            issueEndReached && issues.length > 0 ? (
              <Text style={styles.endText}>End reached</Text>
            ) : null
          }
          onMomentumScrollBegin={() => setDragging(true)}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
        />
      )}
      {loading && <Loader />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  searchView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  issueItem: {
    marginHorizontal: dySize(10),
    marginVertical: dySize(2),
    borderRadius: 4,
    padding: dySize(10),
    backgroundColor: themes.color.gray,
  },
  avatarView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dySize(10),
  },
  avatar: {
    width: dySize(40),
    height: dySize(40),
    borderRadius: dySize(20),
    marginRight: dySize(10),
  },
  name: {
    fontSize: themes.fontSize.medium,
    color: themes.color.black,
    fontWeight: 'bold',
    flex: 1,
  },
  issueTitle: {
    fontSize: themes.fontSize.large,
    color: themes.color.blue,
    marginBottom: dySize(10),
  },
  description: {
    fontSize: themes.fontSize.medium,
    color: themes.color.black,
  },
  issueText: {
    fontSize: themes.fontSize.medium,
    color: themes.color.white,
    fontWeight: 'bold',
    padding: 4,
  },
  error: {
    fontSize: themes.fontSize.medium,
    color: 'red',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: themes.fontSize.medium,
    color: themes.color.gray,
    textAlign: 'center',
  },
  readmoreText: {
    fontSize: themes.fontSize.medium,
    color: themes.color.black,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  endText: {
    marginTop: dySize(10),
    marginBottom: dySize(50),
    fontSize: themes.fontSize.medium,
    color: themes.color.gray,
    textAlign: 'center',
  },
});

export default IssueListScreen;
