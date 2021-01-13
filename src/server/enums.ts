export enum ApplymentState {
    Pending = 0, // 初始狀態，等待刊登者回應
    Accepted, // 刊登者接受
    Confirmed, // 申請人確認,

    // 結束狀態
    Abandoned, // 申請人放棄
    Rejected, // 刊登者拒絕
    Finished // 完成
}