import { h } from "src/view/h";

interface Props {
  success: boolean;
  onClose: () => void;
  onView: () => void;
}

export function ResponseModal(props: Props) {
  // TODO: handle success=false
  return (
    <div class="modal active" id="modal-id">
      <a onclick={props.onClose} class="modal-overlay" aria-label="Close" />
      <div class="modal-container">
        <div class="modal-header">
          <a onclick={props.onClose} class="btn btn-clear float-right" aria-label="Close" />
          <div class="modal-title h5">{props.success ? "Saved!" : "Failed"}</div>
        </div>
        <div class="modal-body">
          <div class="content text-center">
            <div
              class="circle"
              style={{
                fontSize: "2em",
                background: props.success ? "green" : "red",
                display: "flex",
                width: "200px",
                height: "200px",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
            >
              {props.success ? "✓" : "×"}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary float-left" onclick={props.onView}>
            View
          </button>
          <a onclick={props.onClose} class="btn btn-link">
            Close
          </a>
        </div>
      </div>
    </div>
  );
}
