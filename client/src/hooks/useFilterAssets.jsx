import { useApp } from '../context/AppContext';

const useFilterAssets = () => {
  const {
    setSelectSellType,
    setSelectAssetType,
    setSelectProvince,
    setSelectDistrict,
    setSelectSubDistrict,
    setSelectStatus,
    setKeyword,
    setPage,
    setIsResetFilter,
    selectAssetType,
    selectSellType,
    selectProvince,
    selectDistrict,
    selectSubDistrict,
    selectStatus,
    keyword,
  } = useApp();

  const handleResetFilter = () => {
    setSelectSellType('');
    setSelectAssetType('');
    setSelectProvince('');
    setSelectDistrict('');
    setSelectSubDistrict('');
    setSelectStatus('');
    setKeyword('');
    setPage(1);
    setIsResetFilter(true);
  };

  const checkIsNoFilter = () => {
    return (
      !selectAssetType &&
      !selectSellType &&
      !selectProvince &&
      !selectDistrict &&
      !selectSubDistrict &&
      !selectStatus &&
      !keyword
    );
  };
  return {
    handleResetFilter,
    checkIsNoFilter,
  };
};

export default useFilterAssets;
