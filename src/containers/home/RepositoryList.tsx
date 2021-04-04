import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Container} from 'native-base';
import {AppState} from '../../redux/rootReducer';
import MyHeader from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';
import {dySize} from '../../utils/responsive';
import {fetchRepositories} from '../../redux/home/actions';
import Loader from '../../components/LoadingView';
import {Repository} from '../../redux/home/types';
import themes from '../../utils/themes';
import NavigationServices from '../../navigation/NavigationServices';

interface RepositoryListScreenProps {}

const RepositoryListScreen: React.FC<RepositoryListScreenProps> = () => {
  const [organization, setOrganization] = useState('');
  const [submitted, submit] = useState(false);
  const dispatch = useDispatch();
  const {loading} = useSelector((state: AppState) => state.router);
  const {repositories, repoError} = useSelector(
    (state: AppState) => state.home,
  );

  useEffect(() => {}, []);

  const onSubmitOrg = () => {
    submit(true);
    dispatch(fetchRepositories(organization));
  };

  const onSelectRepository = (repo: Repository) => {
    NavigationServices.navigate('IssueList', {
      org: organization,
      repo: repo.name,
    });
  };

  const renderRepositoryItem = (item: any) => {
    const repo = item.item;
    return (
      <TouchableOpacity onPress={() => onSelectRepository(repo)}>
        <View style={styles.repItem}>
          <View style={styles.avatarView}>
            <FastImage
              style={styles.avatar}
              source={{
                uri: repo.owner.avatar_url,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={styles.name} testID="repo-owner-id">
              {repo.owner.login}
            </Text>
            <Text style={styles.issueText}>Issues: {repo.open_issues}</Text>
          </View>
          <Text style={styles.repoName}>{repo.name}</Text>
          <Text style={styles.description}>{repo.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <MyHeader title="Repositories" hasLeft={false} />
      <View style={styles.searchView}>
        <SearchInput
          placeholder="Type your github organization..."
          onChange={setOrganization}
          width={dySize(270)}
          style={{marginRight: 5}}
        />
        <Button
          width={dySize(80)}
          title="Search"
          onPress={onSubmitOrg}
          testID="organization-submit"
        />
      </View>
      {repoError.length > 0 && <Text style={styles.error}>{repoError}</Text>}
      {submitted && repoError.length === 0 && (
        <FlatList
          testID="repository-list"
          data={repositories}
          renderItem={renderRepositoryItem}
          keyExtractor={i => i.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>{'No repositories'}</Text>
          }
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
  repItem: {
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
  repoName: {
    fontSize: themes.fontSize.large,
    color: themes.color.black,
  },
  description: {
    fontSize: themes.fontSize.medium,
    color: themes.color.black,
    fontStyle: 'italic',
    marginVertical: dySize(5),
  },
  issueText: {
    fontSize: themes.fontSize.medium,
    color: themes.color.black,
    fontWeight: 'bold',
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
});

export default RepositoryListScreen;
